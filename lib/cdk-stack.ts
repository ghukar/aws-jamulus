import * as cdk from '@aws-cdk/core';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    /**
     * TODOS:
     * - start an EC2 instance on a public IP
     * - ensure it allows for Session Manager access
     * - ensure it runs the configure-jamulus.sh script as a launch script
     * - ensure the configure-jamulus.sh script can handle yessable questions
     * - ensure the server-settings.sh will be used in the startup script
     * - ensure to allow people to connect to the Jamulus server by adding a security group setting opening UDP connections for port range 22120-22130
     */
  }
}
