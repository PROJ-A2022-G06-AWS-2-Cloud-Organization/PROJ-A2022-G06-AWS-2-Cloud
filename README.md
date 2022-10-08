# PROJ-A2022-G06-AWS-2-Cloud
Repository For COMP.SE.610/620 Autumn 2022 Software Engineering Project 1 &amp; 2

## Developers
* Kosti Korhonen
* Linnea Salmimaa
* Rauli Virtanen
* Miikka Mensio
* Veera Väisänen
* Hermanni Rytkölä
* Onni Hartikainen

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Run instructions For IaC Deployement to AWS
* Background info: In our repo's file bin/cdk_app1.ts there are defined all the Stacks that are deployed to the cloud.
* The stacks are implemented in the /lib folder. 

### First you need to do these necessary setups:

* First you have to have a AWS (Free Tier Account): https://aws.amazon.com/free/
* Create IAM User With Admin priviliges (**AdministratorAccess** in the AWS) in the AWS Console. **!NOTE!** The username must start with **cdk-**
* Create the access key under that IAM user: https://aws.amazon.com/premiumsupport/knowledge-center/create-access-key/
* Install AWS CLI to your local Machine: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
* Check if AWS CLI installation was successful via runnig command `aws --version` on some terminal
* Set up your AWS account by running command `aws configure` on the same terminal
* Give the correct aws_access_key_id, aws_secret_access_key and region. Help can be found e.g. from: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html
* Install AWS CDK, Node.js and TypeScript to your local machine
* Run command `cdk bootstrap aws://<your_aws_account_id>/<region>` e.g. cdk bootstrap aws://123456789012/eu-north-1. This is a necessary step so that you can deploy any cloud resourses to your AWS account with AWS CDK. Ref. https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html

### Deploy IaC to AWS
* Open GitHub Actions Tab
* Select **DeployResourceToAWS** Flow
* From the right, click Run workflow and select the branch which IaC-code you want to deploy
* Input aws_access_key_id, aws_secret_access_key and region which you got from the previous phase
* Click **Run workflow**
* If the flow ran successfully, the resource should be deployed to your AWS

