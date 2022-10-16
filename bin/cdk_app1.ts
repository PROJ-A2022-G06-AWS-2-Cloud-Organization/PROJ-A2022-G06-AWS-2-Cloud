#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { S3stack } from '../lib/S3stack';
import { linkGitHubStack } from '../lib/linkGitHubStack';
import { EC2Stack } from '../lib/EC2Stack';

const environmentConfig: any =
{
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
}

// Create new cdk App
const app = new cdk.App();

/* // Add the Stack to the App
new S3stack(app, 'S3stack', environmentConfig); */

/* Encapsulated the Github and AWS linking to an another class. 
   Here we just instantiate the connection. */
new linkGitHubStack(app, 'linkGitHubStack');

// add EC2 stack to our CDK App
new EC2Stack(app, 'EC2Stack', environmentConfig); 