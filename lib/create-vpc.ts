import { Peer, Port, SecurityGroup, Vpc } from "@aws-cdk/aws-ec2";
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from "@aws-cdk/aws-iam";
import { Bucket } from "@aws-cdk/aws-s3";
import { Stack } from "@aws-cdk/core";

export const createVpc = (stack: Stack, configBucket: Bucket) => {
  const vpc = Vpc.fromLookup(stack, 'VPC', { isDefault: true });

  const securityGroup = new SecurityGroup(stack, 'SSHandJamulusAccess', {
    description: 'Allows access for SSH and for Jamulus clients',
    vpc,
    allowAllOutbound: true,
  });
  
  securityGroup.addIngressRule(
    Peer.anyIpv4(),
    Port.tcp(22),
    'Allows SSH access from Internet'
  );

  const role = new Role(stack, 'InstanceRole', { assumedBy: new ServicePrincipal('ec2.amazonaws.com') });
  role.attachInlinePolicy(new Policy(stack, 'InstanceRolePolicy', {
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
      new PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [`${configBucket.bucketArn}/*`],
        effect: Effect.ALLOW,
      }),
      new PolicyStatement({
        actions: ["s3:ListBucket"],
        resources: [configBucket.bucketArn],
        effect: Effect.ALLOW,
      }),
    ],
  }));

  return { vpc, securityGroup, role };
};
