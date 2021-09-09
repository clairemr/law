---
id: "templates_intro"
title: "Building a template - Intro"
sidebar_label: "Building Your Own Templates"
---

This section will follow the steps taken to build out a new template in Cosmos. Templates are a good way to start with a predefined set of resources used to deploy common patterns in Cosmos. This section will show you how to build out two different templates, in order to provide a greater understanding of where to put different resources and why. From this starting point, you will be able to build out templates that meet your own specific needs.

The base template we'll be using is the blank app template:
[Cosmos Blank App CDK Template](https://github.com/cdk-cosmos/cosmos-blank-extension-cdk)

### Template Sections
An app CDK template requires a few main sections:
- bin folder, containing a main.ts file
- lib folder, containing files described below. The resources defined in the lib folder are created when the bootstrapper runs and updated via the cdk pipeline.

The blank extension template also includes a few extras such as the Prettier formatter and Jest tests


#### lib/ci-cd-solar-system.ts
This is where you will define the CiCd infrastructure for your extension. This includes:
- Defining the functionality to add stages to the CDK and Code pipelines for your extension
- Selecting the appropriate type of pipeline for the resources you are deploying

There is only one instance of the cicd solar system, which is located in the management account and used to deploy into other environments.


#### lib/cosmos.ts
This file defines resources that exist at the Cosmos level (in the management account), such as:
- CodeCommit code repo 
- s3 code bucket if using lambda
- ecr repo if using containers

Your CDK repo is also created as part of this stack. This happens at the Cosmos level because the code for your extension is by default stored in CodeCommit of the management account, so that it can be deployed from there into each environment. Your cdk repo sits outside the App*MgtCiCdSolarSystem, because it defines the stack.


#### lib/galaxy.ts
For this walkthrough, we will not be editing this file. You may need to add resources here for specific use cases, for example if you want to create a resource to share between multiple solar systems in the same galaxy, e.g. shared database


#### lib/index.ts
This is simply an index file, managing the exports from the lib folder so they can be used in `bin/main.ts`.


#### lib/solar-system.ts
This is where you define what resources are needed in each environment for your extension, such as DynamoDB tables, s3 buckets, Route 53 records etc. You define the resources once in this file, and Cosmos will deploy the resources to each environment you have defined in bin/main.ts when you run the extension cdk pipeline.


#### bin/main.ts
This file describes your account configuration and instantiates the resources defined in the lib folder. For example, in the `lib/solar-system.ts` file you define the resources that should be created in each solar system in order to run your app. In `bin/main.ts` you instantiate a solar system into each environment (dev, prd etc).


## Next Steps:
- [Building an ECR Template](templates_ecr.md)
- [Building a Lambda Template](templates_lambda.md)
