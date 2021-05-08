import { BlockDeviceVolume, CfnEIPAssociation, GenericLinuxImage, Instance, InstanceClass, InstanceSize, InstanceType, Peer, Port, Protocol, SecurityGroup, Vpc } from "@aws-cdk/aws-ec2";
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from "@aws-cdk/aws-iam";
import { CfnOutput, Construct } from "@aws-cdk/core";

export interface OnlineMixingConsoleProps {
  jamulusServerIpAddress: string;
};

export class OnlineMixingConsole extends Construct {
  constructor(scope: Construct, id: string, props: OnlineMixingConsoleProps) {
    super(scope, id);

    const vpc = Vpc.fromLookup(this, 'VPCMixer', { isDefault: true });

    const securityGroup = new SecurityGroup(this, 'SSHandJamulusAccess', {
      description: 'Allows access for SSH and for Jamulus clients',
      vpc,
      allowAllOutbound: true,
    });
    
    securityGroup.addIngressRule(
      Peer.anyIpv4(),
      Port.tcp(22),
      'Allows SSH access from Internet'
    );
  
    const role = new Role(this, 'MixRole', { assumedBy: new ServicePrincipal('ec2.amazonaws.com') });
    role.attachInlinePolicy(new Policy(this, 'MixerRolePolicy', {
      statements: [
        new PolicyStatement({
          actions: [
            "ssmmessages:*",
            "ssm:UpdateInstanceInformation",
            "ec2messages:*"
          ],
          effect: Effect.ALLOW,
          resources: ['*'],
        }),
      ],
    }));
  
    const mixer = new Instance(this, 'OnlineMixingConsole', {
      instanceName: 'OnlineMixingConsole',
      machineImage: new GenericLinuxImage({
        // ubuntu 20.04 for intel/AMD
        // 'eu-central-1': 'ami-05f7491af5eef733a',
        // Ubuntu Desktop 20.04 with Jamulus and Ardour installed
        'eu-central-1': 'ami-0652e964f40833660',
      }),
      vpc,
      securityGroup,
      role,
      instanceType: InstanceType.of(InstanceClass.T3A, InstanceSize.XLARGE),
      keyName: 'JamulusKey',
      blockDevices: [{
        volume: BlockDeviceVolume.ebs(20),
        deviceName: '/dev/sda1',
      }],
      // userDataCausesReplacement: true,
      // userData: UserData.custom(readFileSync('./lib/configure-online-mixer.sh', 'utf8')),
    });
    // mixer.connections.allowFromAnyIpv4(new Port({
    //   stringRepresentation: 'VNC Ubuntu Desktop',
    //   protocol: Protocol.TCP,
    //   fromPort: 5901,
    //   toPort: 5901,      
    // }));

    new CfnEIPAssociation(this, 'MixerIp', {
      // this should be a parameter in cdk.json
      allocationId: 'eipalloc-3baa7e00',
      instanceId: mixer.instanceId,
    });

    new CfnOutput(this, 'MixingConsoleIp', { value: mixer.instancePublicIp });
  };
};
