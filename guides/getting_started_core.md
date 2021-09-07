---
id: "getting_started_core"
title: "Getting Started with the Core"
sidebar_label: "Core"
---

In the previous step, we bootstrapped the bootstrap toolkit. This gave us IAM roles and a codebuild project, which we can now use to bootstrap Cosmos into the management account defined in your `lib/main.ts` file.

To bootstrap your Cosmos core, run the below command in the base directory of your project, with credentials for the master account exported. You will need to be using an IAM role with (operator permissions)).

    npx cdk --app "node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js" deploy

This will archive your current working directory and pass it as an asset to the CDK Toolkit s3 bucket in your master account, and trigger the CodeBuild job to bootstrap your Cosmos core.

> There is a known issue with this step in some versions of CDK Cosmos, due to naming changes in later versions of AWS CDK. See [issue #304](https://github.com/cdk-cosmos/cosmos/issues/304) for updates. If this step doesn't deploy the resources needed (e.g. no new stacks are created), use STACKS="--all" npx cdk --app "node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js" deploy 

A CodeCommit repository to house this newly customised Core was created as part of the bootstrapping process above. You should now update your local repository to point to the new CodeCommit repository. Replacing the _your-region_ section with the region you selected in `bin/main.ts`, run the following command:

    git remote set-url origin "https://git-codecommit.your-region.amazonaws.com/v1/repos/core-cdk-repo"

Add the changes made to this template by running `git add .`, commit the changes by running `git commit -m "inital commit"`, and push the changes to CodeCommit by running `git push` with your AWS master account credentials exported in the CLI.

### What you'll get

_Sample Pattern with Management, Development & Production Accounts, with two Solar Systems in Dev (Dev & Test):_

![](./assets/getting_started/cosmos-core-bootstrap.png)

__Cosmos Resources__
- TLD (top level domain), e.g. demo.site.com
- Master role that creates resources and can assume cross-account roles to create resources in those accounts
- Pipeline to deploy new resources if needed (*Core-DemoApp-Cdk-Pipeline*)

__Galaxy Resources__
- Cross-account role that master can assume 
- Shared KMS encrytion key, can be used by solar systems to encrypt things

### Solar systems
On the first run of the pipeline, solar systems are commented out in `bin/main.ts`. This is to avoid dependency issues, as the solar systems rely on resources that are created on the first run through of the pipeline. When you uncomment the solar system and run the pipeline, it will create a new deploy stage in the pipeline to deploy to the new environment if you have something like the below code (provided by default).

    // Add NON-PRD deploy stage
    ciCd.ciCd?.addDeployStackStage({
        name: "DeployNonPrd",
        stacks: [dev],
    });

CDK Cosmos is currently using AWS Code Pipelines, which will pause and need to be re-run when a change is made to the pipeline itself. A way to minimise pipeline runs is to add a CiCd stage to your pipeline, which will deploy the changes to CiCd early on instead of waiting until the final deploy stage.

    // Add CiCd deploy stage
    ciCd.ciCd?.addDeployStackStage({
        name: "DeployCiCd",
        stacks: [ciCd],
        isManualApprovalRequired: false,
    });

You can also achieve the same effect with a more manual step, by starting the build projects with an override to deploy only the CiCd stack. You will need to set stack to `-e *CiCd*` (for earlier versions of Cosmos) or the full name of the CiCd stack if using a later (AWS CDK 1.104+ won't accept wildcard naming).

Future versions of CDK Cosmos may switch to using the new CDK Pipeline construct, which is self-mutating, and will remove some of the duplicate runs of the pipeline.

> If using a version of CDK Cosmos that is below 0.8.12, using certs in your solar system may require going into AWS Certificate manager to create a route 53 record. That is outside the scope of this guide - it is recommended to use the latest version of CDK Cosmos to access the latest features and bug fixes.

#### What you have now
Solar system in each environment defined in `bin/main.ts`
- vpc and subdomain (e.g. dev, tst, prd from tld)
- certificates (optional)

### Next Steps
Once you've bootstrapped your Cosmos core, you can use these resources within extensions to build out your apps.

***

## [Next Step: Deploying Cosmos Extension](getting_started_extension.md)