# aws-jamulus

Automatically sets up a Jamulus server for on AWS using CDK. Jamulus allows bands to do jam sessions in a remote environment.

## Getting Started (rough list of commands)

```bash
git clone https://github.com/cabcookie/aws-jamulus.git
cd aws-jamulus
# npm install global cdk
# npm install global awscli
npm install
# create PEM file with name JamulusKey in EC2 and download it
# aws configure
cdk bootstrap
cdk deploy
```


## TODOS

- describe how to establish a Jamulus Server
- describe how to establish a Mixing Console
- create .sh files for connecting with the server and the mixing console
- describe pre-requisites
1. Create AWS account
1. Creating a key pair
1. Create two Elastic IPs so your Jamulus Server and your Mixing Console always have the same IP; copy the allocation ID
1. Install cdk and aws cli locally
1. Clone git repo
1. Configure aws environment

## Information on the CDK TypeScript project

The `cdk.json` file tells the CDK Toolkit how to execute your app.

### Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
