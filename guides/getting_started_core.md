---
id: "getting_started_core"
title: "Getting Started with the Core"
sidebar_label: "Core"
---

## My Understanding of Cosmos
There are several packages available in the Cosmos repository. Cosmos is an npm library and could theoretically be installed directly using `npm i @cdk-cosmos/core` in the terminal. The npm package provides code templates for Cosmos Core & Extensions, which define the minimum infrastructure needed to get started (see details below). However, it also defines its own CI/CD pipeline which it then uses to build itself, creating a 'chicken vs egg' problem. Simply installing the npm package will not create the CI/CD pipeline.

### Creating the Cosmos pipeline
In order to create the Cosmos pipeline, it must be manually deployed the first time, in a process known as the Big Bang. It should be installed into the master (typically a management) account that will manage all other environments (e.g. testing, staging, production). Follow the instructions in the below readme to installing cosmos core.

### [Readme: Deploy Cosmos core](https://github.com/cdk-cosmos/cosmos-core-cdk)

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