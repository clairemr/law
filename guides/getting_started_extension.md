---
id: "getting_started_extension"
title: "Getting Started with Extensions"
sidebar_label: "Extensions"
---

CDK Cosmos provides high level resources in the core that can be shared among your various apps, in order to minimise cost and maximise efficiency. These core resources are consumed through a Cosmos concept known as the Portal. The Portal gives access to the cluster and listeners/ALB from the core in a decoupled import/export pattern to use in ECS.

This import/export pattern is the main benefit of CDK Cosmos, as although extensions are dependent on the core, they are kept separate from one another despite existing in the same AWS account. This means that an error or deleted stack in one extension won't have any effect on other extensions sharing the same Cosmos core.

This has all been patternised in CDK Cosmos. To use the portal to target a specific account to add or deploy resources into those galaxies/solar systems, you simply need to align to the naming scheme in the core across your extensions. E.g. `new AppGalaxyStack(cosmos, 'Mgt')` must use **Mgt** in both core and extensions. Cosmos will do the rest!

>Note: You will need to have a Cosmos Core in your management account before you deploy an extension. You will also need to have a solar system set up to you have access to thosee resources for your extension.

### Edit the Extension Template
Bootstrapping an extension is similar to setting up your core Cosmos. Again, the easiest way to get started with an extension is to clone a template to your local machine and run `npm install`. __To avoid errors, make sure you are running the same package versions as Core Cosmos.__

- [Cosmos ECS Extension Template](https://github.com/cdk-cosmos/cosmos-extension-cdk): used in this guide
- [Cosmos Blank Extension Template](https://github.com/cdk-cosmos/cosmos-blank-extension-cdk): used to build out different types of extensions

### Bootstrap an Extension
As with core cosmos, fill out `bin/main.ts` with your account configuration and app name. Then, simply export your AWS CLI master account credentials in the terminal and run the below command. You will need to be using an IAM role with (operator permissions)).

    npx cdk --app "node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js" deploy


> As with core, if you hit [issue #304](https://github.com/cdk-cosmos/cosmos/issues/304) where this step doesn't deploy the resources needed, use STACKS="--all" npx cdk --app "node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js" deploy 

This will archive this Extension and pass it as an asset to the Cosmos CDK Toolkit s3 bucket in your master account, and trigger the CodeBuild job to bootstrap your Extension. You can watch the CodeBuild project logs (cdk-toolkit-bootstrap-project) and CloudFormation to see what resources are being created.

A CodeCommit repository to house this newly customised Extension was created as part of the bootstrapping process above. Update the git repository in this Extension to point to the new CodeCommit respository. Replacing the __your-region__ section with the region you selected in Step 3 and the __your-app__ section with the name you gave your project in `bin/main.ts `, run the following command:

    git remote set-url origin "https://git-codecommit.your-region.amazonaws.com/v1/repos/app-your-app-cdk-repo"

You can also find the repository url in CodeCommit. Then:

- Add the changes made to this template by running `git add .`
- Commit the changes by running `git commit -m "inital commit"` 
- Push the changes to CodeCommit by running `git push`

Your Extension now has a CDK & Code Pipeline. Any further changes may be deployed using the Extension's own CDK Pipeline.

### Solar Systems
As with core, the Solar Systems need to be deployed after bootstrapping as they are dependent on Cosmos and Galaxy resources created on the initial run of the pipeline. To deploy, uncomment the solar system, push up your changes and re-run the App CDK pipeline. 

> If you get an error 'AppDemoDevDevSolarSystem failed: Error [ValidationError]: Unable to fetch parameters [/App/Demo/Dev/Dev/VersionState] from parameter store for this account.' when running the cdk pipeline to add the solar systems, run the code pipeline first.

#### Deploy Stages
This template includes a separate deploy stage in the code pipeline for each new solar system. The below code would deploy the `dev` and `tst` stacks.

    ciCd.addCdkDeployEnvStageToCodePipeline({
        name: 'DeployDev',
        stacks: [dev, tst],
    });

This is optional. The template includes a final deploy stage that will deploy all stacks, however, separating out stacks allows you to retry sections - for example, you may wish to run the dev stack to test your changes before approving a roll out to prod. It is also recommended to include a CiCd stage at the start of the pipeline, to minimise additional runs of the pipeline. You can add stages to both the Code pipeline (`ciCd.addCdkDeployEnvStageToCodePipeline`) and the CDK pipeline (`ciCd.addCdkDeployEnvStageToCdkPipeline`) for your extension, if you have defined those functions in `lib/ci-cd-solar-system.ts`. See (cosmos-blank-extension-cdk)[https://github.com/cdk-cosmos/cosmos-blank-extension-cdk/blob/master/lib/ci-cd-solar-system.ts] for an example of this if your template does not include it.

### Next Steps
Once you've bootstrapped your Cosmos extension, you can continue on to deploy a sample Hello World app.

***

## [Next Step: Deploying Cosmos App](getting_started_app.md)