import * as cdk from '@aws-cdk/core';
import { Template } from '@aws-cdk/assertions';
import * as EC2TestStack from '../lib/EC2Stack';
import '@aws-cdk/assert/jest';

const app = new cdk.App();

const stack = new EC2TestStack.EC2Stack(app, 'EC2Stack');

const template = Template.fromStack(stack);

test('EC2 Instance and related resouces are created', () => {

    template.resourceCountIs("AWS::EC2::VPC", 1);
    template.resourceCountIs("AWS::EC2::Subnet", 2);
    template.resourceCountIs("AWS::EC2::RouteTable", 2);
    template.resourceCountIs("AWS::EC2::Route", 2);
    template.resourceCountIs("AWS::EC2::SubnetRouteTableAssociation", 2);
    template.resourceCountIs("AWS::EC2::InternetGateway", 1);
    template.resourceCountIs("AWS::EC2::SecurityGroup", 1);
    template.resourceCountIs("AWS::IAM::InstanceProfile", 1);
    template.resourceCountIs("AWS::EC2::Instance", 1);

});

test('EC2 Instance Type is Correct', () => {

    template.hasResourceProperties("AWS::EC2::Instance", {
        InstanceType: "t3.micro"
    });
});

test('EC2 VPC Configurations are Correct', () => {

    template.hasResourceProperties("AWS::EC2::VPC", {
        EnableDnsHostnames: true,
        EnableDnsSupport: true,
        InstanceTenancy: "default",
        Tags: [
            {
                "Key": "Name",
                "Value": "EC2Stack/cdk-ec2-instance-v2"
            }
        ]
    });

});


