---
id: "getting_started_core"
title: "Getting Started with the Core"
sidebar_label: "Core"
---

In the previous step, we bootstrapped the bootstrap code. This gave us IAM roles and a codebuild project, which we can now use to bootstrap Cosmos into the account defined in your lib/main.ts file.

To bootstrap your Cosmos core, run the below command in the base directory of your project:

`npx cdk --app “node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js” deploy`

This will archive your current working directory and pass it as an asset to the CDK Toolkit s3 bucket in your master account, and trigger the CodeBuild job to bootstrap your Cosmos core or extension.

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

solar system
- vpc and subdomain (e.g. dev, tst, prd from tld)
- certificates (optional)

### Next Steps
Once you've bootstrapped your Cosmos core, you can use these resources within extensions to build out your apps.

## [Next Step: Deploying Cosmos Extension](getting_started_extension.md)

***

_If you want a different pattern for which there is no template, can we have a choice diagram here for people to select what they need?/Or it is easier to add later - when is the best time to add resources?_

If you've already deployed a Cosmos core, skip ahead to:
#### [Deploying Cosmos Extension](getting_started_extension.md)


#### Questions to answer
- Why use the bootstrap instead of installing through npm? To create the initial pipeline
- Where to install cosmos core? Orchestrated from the management account, but installs across the different accounts
- Where to install extension code? ^same pattern, different purpose
- How to build out extensions? Same as other cloud formation stuff, use amazon docs. Some things are built in features
- ^How to find what features are included
- Are there any CDK things not supported by cosmos? yes, just not everything has a pattern. Can go raw cdk, but hasn't been nicely bundled up
- Where to contribute to open source code/code deep dive/using api docs
- What resources are built in a big bang/by default in core and extensions
- What parts of galaxies and solar systems are managed by core cosmos, what parts are in extensions? I assume most/all of solar system and part of galaxy is in the extension
- What level of AWS permissions do I need to deploy cosmos core/extensions?

### Details to go into
- IAM role explanation
- Certs
- Auto scaling groups
- The features that have been built out specifically and why
- Features vs building blocks



***

#### Extra notes
Cosmos can't run locally, unlike something like React. Creating infrastructure components in code


cdk deploy might not work in an organisation because of security stuff
bootstrap local, which runs command to deploy it for you through pipeline which then creates its own pipeline to run itself
cdk toolkit bootstrap creates resources for the first time, then once that's run you can use the other cdk pipeline
^admin to set up, then other users can trigger it (with less permissions)

certs - s3 bucket. ideally would be a core feature, imported into extensions through portal
ecr pattern and new cert function might trigger cloud conformity alerts within IAG <-- something to be aware of in prep
not checking cert file type, have to assume user is doing the right thing

things getting stuck - sometimes an npm issue, which is why sometimes you need to delete npm modules and re-install. other
times reploy stack?? <-- shouldn't be the case. Breaking changes need to mention that in release notes>

####testing
when and how to run tests

### documentation gaps
- bootstrapping, need to change TLD <-- how does cosmos check for this? Route 53 etc
- when bootstrapping, add one account at a time? or just the master account role and then all others
- need to clarify specific IAM permissions that policy admin/operator have that allow them to deploy the bootstrap bnits

#### bootstrapping cosmos core
to bootstrap cosmos (step 6), you should be in operator role <-- allowed to do everything admin can except create and modify policies, policy admin can do policies but nothing else
dot at end of step 6 needs to go, not part of the command
zipping up project, 
add to step 7 explanation, can view logs in code build console
what is the bootstrap stack created when bootstrapping the core?

### More advanced
Alternatively, to deploy a Cosmos extension, see __[Deploy Cosmos Extension](getting_started_extension.md)__. To deploy only specific stacks, set environment variable STACKS to the required stacks: `STACKS="Stack1 Stack2" npx cdk --app “node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js” deploy` _(Why would you need to do this?)_