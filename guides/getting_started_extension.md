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
