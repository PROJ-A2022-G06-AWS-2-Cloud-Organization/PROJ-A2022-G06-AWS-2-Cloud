import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { BucketEncryption } from '@aws-cdk/aws-s3';

const s3BucketName = 'cdk-s3-test-bucket-encrypted-v2';

export class S3stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a S3 bucket resourse within this Stack.
    new s3.Bucket(this, 'MyBucket', {
      bucketName: s3BucketName,
      encryption: BucketEncryption.S3_MANAGED,
      publicReadAccess: false
    });

}
}




