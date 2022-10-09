import * as cdk from '@aws-cdk/core';
import { Template } from '@aws-cdk/assertions';
import * as s3TestStack from '../lib/S3stack';
import '@aws-cdk/assert/jest';

const app = new cdk.App();
    // WHEN
  const stack = new s3TestStack.S3stack(app, 'MyTestStack');
    // THEN
  const template = Template.fromStack(stack);

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk_app1-stack.ts
test('S3 Bucket Created', () => {
  

  template.hasResourceProperties("AWS::S3::Bucket", {
    BucketName: s3TestStack.s3BucketName
  });

  template.resourceCountIs("AWS::S3::Bucket", 1);
  
});
