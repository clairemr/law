---
id: "getting_started_extension"
title: "Getting Started with Extensions"
sidebar_label: "Extensions"
---

## My Understanding of Extensions
Extensions are where you build out the resources you need to deploy your specific app. They utilise shared resources from core cosmos
 - solar system = vpc and dns hosted public & private zones, plus specific features

This is where you add app-specific functionality like lambda functions, ecs services etc.

### How they communicate with Core
The portal is an important concept in cdk-cosmos. This is how extensions use the resources built in core cosmos, giving access to the cluster and listeners/ALB from the core in a decoupled import/export pattern to use in ecs.
Import/export pattern is the main benefit <-- I'm not sure why though...
Once cluster has been created it sits in core, ext is separate, but dependent on core. Ext needs to know ids core has created, exported under fixed name. In ext assume those exist with specifc
decoupled means they're completely separate and can't affect each other <-- won't accidentally take down someone elses thing if you make a mistake or delete a stack
^has been patternised for you, don't need to manually do that. e.g. import solar system

To use the portal, it is essential that you have account names consistent across core and extensions, e.g. `new AppGalaxyStack(cosmos, 'Mgt')` must use **Mgt** in both core and extensions.


### What exists at Cosmos level?
At the Cosmos level (in the management account where you installed the core) is where things that need to be shared across accounts and where singleton resources should live
- Code repository for the app (which can then be deployed into the various environments)
- Elastic Container Registry (ECR) repo for Docker images. The extension assumes you're creating an ECS app. If not, you may not need this resource

Cosmos separates infrastructure from what is being deployed. In the core Cosmos account, you will have two pipelines:

#### CDK pipeline
This pipeline is used to deploy the cdk and create resources needed in AWS to run your app, such as lambda functions, dynamo db tables etc. Edit `lib/solar-system.ts` to change what resources are provisioned for your app, then re-run the pipeline to make changes.

#### Code pipeline
This pipeline is used to build and deploy code. How it is deployed will depend on what you have included in your cdk pipeline, but releasing new changes could include ... Push changes to (repo naming convention) with a Makefile at the root of your project, and re-run the pipeline to make changes.

### What features can I include?
Cosmos unlocks the power of AWS, in an easy to use format. Some are added as features with additional Cosmos support.

## Setting up your extension
Once you've installed the core cosmos packages, in the same account follow the instructions in the Extension readme (below) to install your extension.

### [Readme: Deploy Cosmos extension](https://github.com/cdk-cosmos/cosmos-extension-cdk)


#### Setting up extension cdk pipeline
- The above steps give you default extension (which includes...)
- How to change repo type, number of galaxies/solar systems etc?
- To make changes (e.g. add features, change codepipeline steps, do ...) then re-run the cdk pipeline

#### Those steps in detail with examples

### Setting up extension code pipeline
Where do you set the location of the code repo? e.g. how would I get the url to clone to my local machine

Creating a makefile

### Extension workflow
Once you've set up your extension, the Cosmos workflow will be:
- Development: Do your local coding wherever you want
- Push changes: Push changes up to your repo, doing pull requests, merge changes to master etc
- Release change: Run the code pipeline 

