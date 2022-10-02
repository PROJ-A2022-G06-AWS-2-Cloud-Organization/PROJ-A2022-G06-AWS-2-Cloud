#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { S3stack } from '../lib/S3stack';
import { linkGitHubStack } from '../lib/linkGitHubStack';

// Create new cdk App
const app = new cdk.App();
// Add the Stack to the App
new S3stack(app, 'S3stack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
/* Encapsulated the Github and AWS linking to an another class. 
   Here we just instantiate the connection. */
new linkGitHubStack(app, 'linkGitHubStack');