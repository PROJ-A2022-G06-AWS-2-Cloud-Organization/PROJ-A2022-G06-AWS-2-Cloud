import * as cdk from '@aws-cdk/core';
import { Template } from '@aws-cdk/assertions';
import * as s3TestStack from '../lib/S3stack';
import '@aws-cdk/assert/jest';
import {
    ABSENT, notMatching, exactValue
} from '@aws-cdk/assert';




const app = new cdk.App();

const stack = new s3TestStack.S3stack(app, 'MyTestStack');

const template = Template.fromStack(stack);

test('S3 Bucket Created', () => {

    template.resourceCountIs("AWS::S3::Bucket", 1);

});

test('S3 Bucket Name is Correct', () => {

    template.hasResourceProperties("AWS::S3::Bucket", {
        BucketName: s3TestStack.s3BucketName
    });

});

test("S3 bucket Should Not Be Public", () => {
    expect(stack).not.toHaveResourceLike("AWS::S3::Bucket", {
        PublicAccessBlockConfiguration: ABSENT,
    });

    expect(stack).not.toHaveResourceLike("AWS::S3::Bucket", {
        PublicAccessBlockConfiguration: notMatching(
            exactValue({
                BlockPublicAcls: true,
                BlockPublicPolicy: true,
                IgnorePublicAcls: true,
                RestrictPublicBuckets: true,
            })
        ),
    });
});

test("S3 Bucket Should Be Encrypted", () => {
    expect(stack).not.toHaveResourceLike("AWS::S3::Bucket", {
        BucketEncryption: ABSENT,
    });

    expect(stack).not.toHaveResourceLike("AWS::S3::Bucket", {
        BucketEncryption: notMatching(
            exactValue({
                ServerSideEncryptionConfiguration: [
                    {
                        ServerSideEncryptionByDefault: {
                            SSEAlgorithm: "AES256",
                        },
                    },
                ],
            })
        ),
    });
});
