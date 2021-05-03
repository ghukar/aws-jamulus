import { GenericLinuxImage, Instance, InstanceClass, InstanceSize, InstanceType, Port, Protocol } from '@aws-cdk/aws-ec2';
import { Stack, Construct, StackProps, CfnOutput } from '@aws-cdk/core';
import { readFileSync } from 'fs';
import { createConfigBucket } from './create-config-bucket';
import { createVpc } from './create-vpc';

export class JamulusServerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const configBucket = createConfigBucket(this);
    const vpcParams = createVpc(this, configBucket);
    
    const host = new Instance(this, 'JamulusInstance', {
      instanceName: 'JamulusServer',
      ...vpcParams,
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.SMALL),
      machineImage: new GenericLinuxImage({
        'eu-west-1': 'ami-0794bfa4791737d52',
        'eu-central-1': 'ami-08cd0e75576599f20',
      }),
      keyName: 'JamulusKey',
    });
    host.addUserData(readFileSync('./lib/configure-jamulus.sh', 'utf8'));
    host.connections.allowFromAnyIpv4(new Port({
      stringRepresentation: 'Jamulus access',
      protocol: Protocol.UDP,
      fromPort: 22120,
      toPort: 22130,
    }));

    new CfnOutput(this, 'JamulusPublicIp', { value: host.instancePublicIp });
  }
}
