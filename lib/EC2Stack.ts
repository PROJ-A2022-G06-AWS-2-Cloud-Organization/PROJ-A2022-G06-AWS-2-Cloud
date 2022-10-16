import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import { readFileSync } from 'fs';

export const ec2Config = {
    ec2InstanceName : 'cdk-ec2-instance-v2',
    ec2SecurityKey: 'WebServerKey',
    ec2Script : './lib/ec2_scripts/install_nginx.sh',
    scriptCharEncoding : 'utf-8'
};

export class EC2Stack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // 👇 create VPC in which we'll launch the Instance
        const vpc = new ec2.Vpc(this, ec2Config.ec2InstanceName, {
            cidr: '10.0.0.0/16',
            natGateways: 0,
            subnetConfiguration: [
                { name: 'public', cidrMask: 24, subnetType: ec2.SubnetType.PUBLIC },
            ],
        });

        // 👇 create Security Group for the Instance
        const webserverSecurityGroup = new ec2.SecurityGroup(this, 'webserver-sg', {
            vpc,
            allowAllOutbound: true,
        });

        webserverSecurityGroup.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(22),
            'allow SSH access from anywhere',
        );

        webserverSecurityGroup.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(80),
            'allow HTTP traffic from anywhere',
        );

        webserverSecurityGroup.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(443),
            'allow HTTPS traffic from anywhere',
        );

        // 👇 create a Read-Only IAM Role for the EC2 Instance
        const webserverRole = new iam.Role(this, 'webserver-role', {
            assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'),
            ],
        });

        // 👇 create the EC2 Instance
        const ec2Instance = new ec2.Instance(this, 'ec2-instance-t3-micro', {
            vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PUBLIC,
            },
            role: webserverRole,
            securityGroup: webserverSecurityGroup,
            instanceType: ec2.InstanceType.of(
                // AWS Free-Tier Eligible Instance type
                ec2.InstanceClass.T3,
                ec2.InstanceSize.MICRO,
            ),
            /* Image description from AWS console (free-tier eligible):
            Amazon Linux 2 Kernel 5.10 AMI 2.0.20220912.1 x86_64 HVM gp2 */
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
                kernel: ec2.AmazonLinuxKernel.KERNEL5_X,
                virtualization: ec2.AmazonLinuxVirt.HVM,
                storage: ec2.AmazonLinuxStorage.GENERAL_PURPOSE,
                cpuType: ec2.AmazonLinuxCpuType.X86_64
            }),
            keyName: ec2Config.ec2SecurityKey,
        });

        //  load contents of script
        const userDataScript = readFileSync(ec2Config.ec2Script, ec2Config.scriptCharEncoding);
        //  add the Install Nginx script to the Instance
        ec2Instance.addUserData(userDataScript);
    }

}





