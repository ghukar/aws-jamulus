import { CfnEIPAssociation, GenericLinuxImage, Instance, InstanceClass, InstanceSize, InstanceType, Port, Protocol } from '@aws-cdk/aws-ec2';
import { Stack, Construct, StackProps, CfnOutput } from '@aws-cdk/core';
import { createConfigBucket } from './create-config-bucket';
import { createVpc } from './create-vpc';
import { OnlineMixingConsole } from './online-mixing-console';

export class JamulusServerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const configBucket = createConfigBucket(this);
    const vpcParams = createVpc(this, configBucket);
    
    const host = new Instance(this, 'JamulusInstance', {
      instanceName: 'JamulusServer',
      ...vpcParams,
      instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.SMALL),
      machineImage: new GenericLinuxImage({
        // an Ubuntu 18.04 arm64 standard image
        // 'eu-central-1': 'ami-01bced7e7239dbd82',
        // Custom image with Ubuntu 18.04 for arm64 with a running Jamulus server
        'eu-central-1': 'ami-03a6b53e1f4869325',
      }),
      keyName: 'JamulusKey',
      // user data not needed as we are using a customized image with Jamulus running already
      // userData: UserData.custom(readFileSync('./lib/configure-jamulus.sh', 'utf8')),
      // userDataCausesReplacement: true,
    });
    new CfnEIPAssociation(this, 'ElasticIp', {
      allocationId: 'eipalloc-4d0de976',
      instanceId: host.instanceId,
    });
    host.connections.allowFromAnyIpv4(new Port({
      stringRepresentation: 'Jamulus access',
      protocol: Protocol.UDP,
      fromPort: 22120,
      toPort: 22130,
    }));
    new CfnOutput(this, 'JamulusPublicIp', { value: host.instancePublicIp });

    const onlineMixer = new OnlineMixingConsole(this, 'OnlineMixer', {
      jamulusServerIpAddress: host.instancePublicIp,
    });
  }
}
