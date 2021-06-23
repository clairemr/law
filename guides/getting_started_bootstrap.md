---
id: "getting_started_bootstrap"
title: "Getting Started - Bootstrapping"
sidebar_label: "Bootstrapper"
---

This template is flavoured for ECS and the walkthrough will deploy a Hello World node app.

The bootstrapper is a package included in Cosmos Core building blocks that extends the AWS CDK toolkit with additional functionality to make deploying a Cosmos core or extension easier. The Cosmos CDK Toolkit includes, in addition to an s3 bucket for staging assets, a CodeBuild project that deploys your CDK. Because this deploy project runs in AWS as opposed to on your local workstation, the necessary roles are already configured for you.

The easiest way to get started with Cosmos is to use a template. Currently there are templates for the following patterns:
- [Cosmos Core CDK ](https://github.com/cdk-cosmos/cosmos-core-cdk)

_When to use extension template vs core template - does extension reinstall core or do you have to install core first either way?_

If you're not sure what you'll need or can't see a template that suits your needs, the Cosmos Core CDK template will give you a blank template, to which you can add more features once you have bootstrapped the initial project. Clone one of those templates to your local machine and run `npm install`

### Edit bin/main.ts 
This is where you will identify the accounts in the Cosmos pattern, e.g. mgt, dev, prod, and configure the needed resources.
1. Complete the configuration objects with your account numbers and regions
2. Change the project name from `Demo` to the name of your Core
3. Replace the TLD (top level domain) with the correct one for your project
3. Add the appropriate CIDR ranges

### Bootstrap the bootstrapper
At this point you have reached the minimal requirements to bootstrap your Cosmos Core. We don't recommend adding any further resources until the bootstrapping process is complete. _You will need to bootstrap the master account first, commenting out the other accounts in main.ts to avoid errors_

When bootstrapping the bootstrapper, you will need to be using an IAM role able to create and edit policies.

Important note for local development: If you get an error in this step, you may need to set
`export CDK_COSMOS_CREDENTIALS_PLUGIN_DISABLE=true`

(^plugin assumes roles when in AWS, but when working locally you use your own credentials)

Any Other Prerequisites?
- AWS CLI?

_Copy across details from readme_




#### What you have now
This is the initial step required to deploy Cosmos into your AWS accounts. At this point, you will have a bootstrap Code Build project in your master account (s3 bucket), and a bootstrap IAM role in each account (including master). This role will be used to bootstrap your Cosmos core or extension. 

Please note that these accounts are created outside of your Cosmos stacks, as they are used to deploy the stacks. Therefore, if you delete Cosmos stacks in future, these roles will remain in the accounts unless manually deleted.

_Sample Pattern with Management, Development & Production Accounts:_

![](./assets/getting_started/cosmos-bootstrap.png)

## [Next Step: Deploying Cosmos Core](getting_started_core.md)

***

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

#### Testing required/questions remaining
- Still not sure why there was an error, are these instructions accurate?
- And if we do need to have accounts commented out, do we then uncomment accounts one at a time, or will it be fine once the master account exists?
- Step 9 of core template, git add to commit template changes. So could you in theory just run npm install in your template and immediately do the bootstrapper, or do you actually need to edit main.ts first?



### Creating the Cosmos pipeline
In order to create the Cosmos pipeline, it must be manually deployed the first time, in a process known as the Big Bang. It should be installed into the master (typically a management) account that will manage all other environments (e.g. testing, staging, production). Follow the instructions in the below readme to installing cosmos core.

### [Readme: Deploy Cosmos core](https://github.com/cdk-cosmos/cosmos-core-cdk)

#### Questions about bootstrapping:
"This command will need to be run once for each AWS account in your multi-account pattern, substituting the AWS_ACCOUNT environment variable each time to target each account. You will need to have the required credentials for each account either in your AWS CLI configuration or exported locally as environment variables." <-- why? =to create the IAM role required to then deploy the cosmos core. is this editing the bootstrap file in the master account/doing something else? how would you then define what each of the accounts are e.g. which is prod, dev etc


### What you'll get
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

features use base pattern and extend it
^ to use a shared feature in an extension, you need to enable it in the core, e.g. ecs. Create cluster, ALB & listener stuff in the core, then consume those resources in extension to deploy container 

feature is a pattern, wrapped up constructs into consumable pattern. Can still use non-shared cdk resources in extensions, don't then need to be bundled in that pattern - can just use standard cdk code
do also include the import/export

core is shared resource, extension is app specific

### Next Steps
Once the core has been installed in an account, you can use these resources within extensions to build out your apps.

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

#### testing
when and how to run tests

