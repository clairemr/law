---
id: "getting_started_extension"
title: "Getting Started with Extensions"
sidebar_label: "Extensions"
---

CDK Cosmos provides high level resources in the core that can be shared among your various apps, in order to minimise cost & maximise efficiency. These core resources are consumed through a Cosmos concept known as the Portal. The Portal gives access to the cluster and listeners/ALB from the core in a decoupled import/export pattern to use in ECS.

This import/export pattern is the main benefit of CDK Cosmos, as although extensions are dependent on the core, they are kept separate from one another despite sharing a single AWS account. This means that an error or deleted stack in one extension won't have any effect on other extensions sharing the same Cosmos core.

This has all been patternised in CDK Cosmos. To use the portal to target a specific account to add or deploy resources into those galaxies/solar systems, you simply need to align to the naming scheme in the core across your extensions. E.g. `new AppGalaxyStack(cosmos, 'Mgt')` must use **Mgt** in both core and extensions. Cosmos will do the rest!

>Note: You will need to have a Cosmos Core in your management account before you deploy an extension. (Factcheck this next bit:) You will also need to have a solar system set up so you have access to the resources needed for your extension.

### Edit the Extension Template
Bootstrapping an extension is similar to setting up your core Cosmos. Again, the easiest way to get started with an extension is to clone a template to your local machine and run `npm install`. __Make sure you are running the same package versions as Core Cosmos. (Confirm whether this is necessary)__

- [Cosmos Extension Template](https://github.com/cdk-cosmos/cosmos-extension-cdk.git)

### Bootstrap an Extension
As with core cosmos, fill out `bin/main.ts` with your account configuration and app name. Then, simply export your AWS CLI master account credentials in the terminal and run the below command. You will need to be using an IAM role with (operator permissions)).

    npx cdk --app "node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js" deploy

_If you see "Subprocess exited with error 127" at this stage, try typing out the command to avoid copying across formatting or whatever is making this break_

_If you see "fail: Bucket named 'cdk-toolkit-assets-YOURACCOUNTNUMBER-ap-southeast-2' exists, but not in account YOURACCOUNTNUMBER. Wrong account?" check your IAM permissions_

_As with core, if this step doesn't deploy the resources needed (e.g. no new stacks are created), change line 5 in @cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js to const stacks = process.env.STACKS || '--all';_
^this should be resolved in an upcoming bug fix, see issue [https://github.com/cdk-cosmos/cosmos/issues/304](#304)
alternatively, use STACKS="--all" npx cdk --app "node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js" deploy

This will archive this Extension and pass it as an asset to the Cosmos CDK Toolkit s3 bucket in your master account, and trigger the CodeBuild job to bootstrap your Extension. You can watch the CodeBuild project logs (cdk-toolkit-bootstrap-project) and CloudFormation to see what resources are being created.

A CodeCommit repository to house this newly customised Extension was created as part of the bootstrapping process above. Update the git repository in this Extension to point to the new CodeCommit respository. Replacing the _your-region_ section with the region you selected in Step 3 and the _your-app_ section with the name you gave your project at 
     -   const cosmos = new AppCosmosStack(app, '_your application name here_', {
      -      env: mgtEnvConfig,
     -   });

Then run the following command:

    git remote set-url origin "https://git-codecommit.your-region.amazonaws.com/v1/repos/app-your-app-cdk-repo"

_You can also find this url in CodeCommit_

- Add the changes made to this template by running `git add .`
- Commit the changes by running `git commit -m "inital commit"` 
- Push the changes to CodeCommit by running `git push`

Your Extension now has a CDK & Code Pipeline. Any further changes may be deployed using the Extension's own CDK Pipeline.

### Solar Systems

Solar system needs to be deployed after bootstrapping
Pipeline currently needs to be run twice, first to make changes to the pipeline, then to deploy the dev solar system. Will hopefully be fixed when [issue 310](https://github.com/cdk-cosmos/cosmos/issues/310) is implemented.

Uncomment solar system, add changes and push up. Re-run cdk pipeline. Required because ext imports a bunch of stuff from the core. portal = imports from core. we got the resources defined in core when we create the solar system. we create them in the core but scoping them to the dev galaxy (dev acct). https listenser already there as part of the dev galaxy core Core*DevDevSolarSystem (includes alb, https listener, vpc etc), imported via naming convention through portal to be used in ext. all exts in this solar system will use the same alb. this.portal.addEcs() is a way of adding the functioanlity to these clusters


code pulls from the repo (build stage), then deploys to the various envs
cdk pipeline just deploys cdk

Note on deploy stages: can have a deploy stage for each env in pipeline, can combine stacks or can keep them all in the final, catch all deploy stage <-- does this redeploy things that have already been deployed on this run of the pipeline?
Splitting them up allows you to retry sections and not have the entire thing rollback if one stack fails (my assumption)

If you have a deploy CiCd stage in your pipeline, when you make changes to the pipeline, it will stop on the CiCd stage and show as 'Cancelled', even if successful. If you try to retry the stage, you will get an error like this:
>The stage named DeployCiCd in the App-MyApp-Cdk-Pipeline pipeline can't be retried now. Either it contains no failed actions, the execution '...' is already superseded, or the pipeline definition has changed since the action(s) failed.
This is the expected behaviour. Deploying CiCd changes requires re-running the pipeline so those stages run, so putting this stage early in the pipeline means you don't have to wait for the entire pipeline to run just so you can start it again.

Alternatively, you can use environmental overrides to just deploy the cicd stack. Start build with overrides, then set stack to `-e *CiCd*` <-- later version (1.104+) won't accept wildcard, use full name of stack

If you get an error 'AppCosmosSandboxDevDevSolarSystem failed: Error [ValidationError]: Unable to fetch parameters [/App/CosmosSandbox/Dev/Dev/VersionState] from parameter store for this account.' when running the cdk pipeline to add the solar systems, run the code pipeline first.

<!-- ## [Next Steps: Deploy Your First App]() -->

***
