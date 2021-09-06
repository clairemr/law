---
id: "getting_started_core"
title: "Getting Started with the Core"
sidebar_label: "Core"
---

In the previous step, we bootstrapped the bootstrap code. This gave us IAM roles and a codebuild project, which we can now use to bootstrap Cosmos into the management account defined in your lib/main.ts file.

To bootstrap your Cosmos core, run the below command in the base directory of your project, with credentials for the master account exported. You will need to be using an IAM role with (operator permissions)).

    npx cdk --app "node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js" deploy

This will archive your current working directory and pass it as an asset to the CDK Toolkit s3 bucket in your master account, and trigger the CodeBuild job to bootstrap your Cosmos core.

_If you see error subprocess 127, try copying the plaintext here:_ npx cdk --app "node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js" deploy

_If this step doesn't deploy the resources needed (e.g. no new stacks are created), change line 5 in @cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js to const stacks = process.env.STACKS || '--all';_
^this should be resolved in an upcoming bug fix, see issue [https://github.com/cdk-cosmos/cosmos/issues/304](#304)
alternatively, use STACKS="--all" npx cdk --app "node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js" deploy

A CodeCommit repository to house this newly customised Core was created as part of the bootstrapping process above. Update the git repository in this Core to point to the new CodeCommit repository. Replacing the _your-region_ section with the region you selected in Step 3, run the following command:
git remote set-url origin "https://git-codecommit.your-region.amazonaws.com/v1/repos/core-cdk-repo"

Add the changes made to this template by running git add ., commit the changes by running git commit -m "inital commit", and push the changes to CodeCommit by running git push

### What you'll get

_Sample Pattern with Management, Development & Production Accounts, with two Solar Systems in Dev (Dev & Test):_

![](./assets/getting_started/cosmos-core-bootstrap.png)

- Cosmos resources 
    - tld (top level domain) e.g. devops.iagcloud.net
    - master role that creates resources and can assume cross-account roles to create resources in those accounts
- Pipeline to deploy new resources if needed (*pipeline naming structure*)

galaxy level
- if cross account, creates cross-account role that master can assume
- shared KMS encrytion key, can be used by solar systems to encrypt things


Solar system needs to be deployed after bootstrapping
If you don't have a CiCd stage in your pipeline, you'll need to run it twice.
Pipeline currently needs to be run twice, first to make changes to the pipeline, then to deploy the dev solar system. Will hopefully be fixed when [issue 310](https://github.com/cdk-cosmos/cosmos/issues/310) is implemented.

Certs issue - if below 8.12, may need to go into certificate manager to create route 53 record

solar system
- vpc and subdomain (e.g. dev, tst, prd from tld)
- certificates (optional)

### Next Steps
Once you've bootstrapped your Cosmos core, you can use these resources within extensions to build out your apps.

## [Next Step: Deploying Cosmos Extension](getting_started_extension.md)