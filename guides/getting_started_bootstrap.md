---
id: "getting_started_bootstrap"
title: "Getting Started - Bootstrapping"
sidebar_label: "Bootstrapper"
---

The bootstrapper is a package included in Cosmos Core building blocks that extends the AWS CDK toolkit with additional functionality to make deploying a Cosmos core or extension easier. The Cosmos CDK Toolkit includes, in addition to an s3 bucket for staging assets, a CodeBuild project that deploys your CDK. Because this deploy project runs in AWS as opposed to on your local workstation, the necessary roles are already configured for you.

The easiest way to get started with Cosmos is to use a template. Currently there are templates for the following patterns:
- [Cosmos Core CDK](https://github.com/cdk-cosmos/cosmos-core-cdk)

This template is flavoured for ECS and the walkthrough will deploy a Hello World node app. You will be able to edit or add more features once you have bootstrapped the initial project. Clone the template to your local machine and run `npm install`

### Edit bin/main.ts 
This is where you will identify the accounts in the Cosmos pattern, e.g. mgt, dev, prod, and configure the needed resources.
1. Complete the configuration objects with your account numbers and regions
2. Change the project name from `Demo` to the name of your Core
3. Replace the TLD (top level domain) with the correct one for your project (e.g. demoapps.mycosmosproject.com)
3. Add the appropriate CIDR ranges 

### Bootstrap the bootstrapper
At this point you have reached the minimal requirements to bootstrap your Cosmos Core. We don't recommend adding any further resources until the bootstrapping process is complete. When bootstrapping the bootstrapper, you will need to be using an IAM role able to create and edit policies.

Deploying the Cosmos CDK Toolkit requires the following environment variables to be exported in your local environment:

- `AWS_MASTER_ACCOUNT`: Your management account in a typical multi-account pattern.
- `AWS_ACCOUNT`: The account in which the Cosmos CDK Toolkit will be deployed. This may be the master account.
- Your AWS credentials (ideally an admin role - you will need to be able to create and edit policies, as well as deploy resources)

For example:

    export AWS_MASTER_ACCOUNT=11111111
    export AWS_ACCOUNT=22222222

Then use the below command to deploy the Cosmos CDK Toolkit resources to your environments.

    npx cdk bootstrap --template "node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/template.yaml" --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess --trust ${AWS_MASTER_ACCOUNT} aws://${AWS_ACCOUNT}/ap-southeast-2

- `--template` substitutes the regular CDK Toolkit template with the Cosmos version
- `--cloudformation-execution-policies` attaches the required policy to the deployment role
- `--trust` defines the AWS account that may deploy into the environment being bootstrapped

 > Important note for local development: if you get an error in this step, you may need to set `export  CDK_CREDENTIALS_PLUGIN_DISABLE=true` (the plugin assumes roles when in AWS, but when working locally you use your own credentials). This should be resolved with (issue #303)[https://github.com/cdk-cosmos/cosmos/issues/303]

This command will need to be run once for each AWS account in your multi-account pattern, substituting the AWS_ACCOUNT environment variable each time to target each account. You will need to have the required credentials for each account either in your AWS CLI configuration or exported locally as environment variables.

#### What you have now
This is the initial step required to deploy Cosmos into your AWS accounts. At this point, you will have a bootstrap Code Build project in your master account, and a bootstrap IAM role in each account (including master). This role will be used to bootstrap your Cosmos Core and Extensions. 

Please note that these resources are created outside of your Cosmos stacks, as they are used to deploy the stacks. Therefore, if you delete Cosmos stacks in future, these roles will remain in the accounts unless manually deleted.

_Sample Pattern with Management, Development & Production Accounts:_

![](./assets/getting_started/cosmos-bootstrap.png)

### Next Steps
Once you've bootstrapped the toolkit, you can continue on to bootstrap your Cosmos core.

***

## [Next Step: Deploying Cosmos Core](getting_started_core.md)


