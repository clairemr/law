---
id: "getting_started_extension"
title: "Getting Started with Extensions"
sidebar_label: "Extensions"
---

Cosmos Core provides high level resources that can be shared among your various apps, in order to (e.g. to minimise cost & maximise efficiency). These core resources are consumed through a Cosmos concept known as the Portal. The Portal gives access to the cluster and listeners/ALB from the core in a decoupled import/export pattern to use in ECS.

This import/export pattern is the main benefit of Cosmos, as although extensions are dependent on the core, they are kept separate from one another despite sharing a single AWS account. This means that an error or deleted stack in one extension won't have any effect on others in the same (galaxy? Cosmos ecosystem?).

This has all been patternised in Cosmos and doesn't require manual steps. To use the portal, it is essential that you have account names consistent across core and extensions, e.g. `new AppGalaxyStack(cosmos, 'Mgt')` must use **Mgt** in both core and extensions. Cosmos will do the rest!

^these are already named in core. To target a specific account to add or deploy resources into those galaxies/solar systems, you need to align to that naming scheme.

### Edit the Extension Template
As with Core Cosmos, the easiest way to get started with an extension is to clone a template to your local machine and run `npm install`

- [Cosmos Extension Template](https://github.com/cdk-cosmos/cosmos-extension-cdk.git)




At this point, we are setting up a (blank? prefilled template?) extension. You can add more features here or at a later date.

### Bootstrap an Extension
Once you have filled out `bin/main.ts` with your account configuration, export your AWS CLI master account credentials in the terminal and run the below command. You will need to be using an IAM role with (admin?) permissions.

`npx cdk --app “node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js” deploy`

This will archive this Extension and pass it as an asset to the Cosmos CDK Toolkit s3 bucket in your master account, and trigger the CodeBuild job to bootstrap your Extension. A CodeCommit repository to house this newly customised Extension was created as part of the bootstrapping process above. Update the git repository in this Extension to point to the new CodeCommit respository. Replacing the _your-region_ section with the region you selected in Step 3 and the _your-project-name_ section with the name you gave your project in Step 4, run the following command:

`git remote set-url origin "https://git-codecommit.your-region.amazonaws.com/v1/repos/app-your-project-name-cdk-repo"`

- Add the changes made to this template by running `git add .`
- Commit the changes by running `git commit -m "inital commit"` 
- Push the changes to CodeCommit by running `git push`

Your Extension now has a CDK & Code Pipeline. Any further changes may be deployed using the Extension's own CDK Pipeline.

## [Next Steps: Add Features]()

***

^when to use CDK pipeline, when to use Code pipeline?

_Add diagram_

#### Should features be a separate page? <-- is it better to add them in the bootstrap stage or afterwards/does it make any difference?

features use base pattern and extend it
^ to use a shared feature in an extension, you need to enable it in the core, e.g. ecs. Create cluster, ALB & listener stuff in the core, then consume those resources in extension to deploy container 

feature is a pattern, wrapped up constructs into consumable pattern. Can still use non-shared cdk resources in extensions, don't then need to be bundled in that pattern - can just use standard cdk code
do also include the import/export

core is shared resource, extension is app specific

***

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

Creating a makefile - is that required for all projects?

### Extension workflow
Once you've set up your extension, the Cosmos workflow will be:
- Development: Do your local coding wherever you want
- Push changes: Push changes up to your repo, doing pull requests, merge changes to master etc
- Release change: Run the code pipeline 

