import { Bucket } from "@aws-cdk/aws-s3";
import { BucketDeployment, Source } from "@aws-cdk/aws-s3-deployment";
import { RemovalPolicy, Stack } from "@aws-cdk/core";

export const createConfigBucket = (scope: Stack) => {
  const bucket = new Bucket(scope, 'JamulusConfigBucket', {
    bucketName: 'jamulus-config-bucket',
    removalPolicy: RemovalPolicy.DESTROY,
  });
  new BucketDeployment(scope, 'BucketDeployment', {
    destinationBucket: bucket,
    sources: [Source.asset('./server-config')],
  });
  return bucket;
};