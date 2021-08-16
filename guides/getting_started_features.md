---
id: "getting_started_features"
title: "Getting Started with Features"
sidebar_label: "Features"
---
At this stage, you have a simple extension. If you used the blank template though, you won't have much in it. Here's where we start building out the features of your extension. While you can use vanilla Cloud Formation to build out your templates, there are also a number of features that have been built into cosmos to simplify this.

## I want to add features to my extension
Use `this.portal` to access things you've exported in the core e.g. `this.portal.addGithubEnterprise`

## Where will you store your code?

#### I want to use AWS Code Bucket
    cosmos.codeBucket.addToResourcePolicy(
        new PolicyStatement({
            actions: ['s3:*'],
            principals: [new AccountPrincipal(devEnvConfig.account), new AccountPrincipal(prdEnvConfig.account)],
            resources: [cosmos.codeBucket.bucketArn, `${cosmos.codeBucket.bucketArn}/*`],
            effect: Effect.ALLOW,
        })
    );

#### I want to use Github/Github Enterprise/Bamboo
Update endpoint to be the address of your repo and certificate location/cert.pem to your cert location and filename.
- add Github enterprise to core cosmos & re-run the core cosmos cdk pipeline (<-- import everything from iag-cosmos package)
 - non iag will need to set up endpoint & other props
- go into CodeSuite settings/connections, there will be a pending connection
- sign into github enterprise and create an app
- add this.portal.addGithubEnterprise to cicd solar system of the extension
    
^if migrating across