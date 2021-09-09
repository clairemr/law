---
id: "getting_started_app"
title: "Getting Started - Hello World App"
sidebar_label: "Hello World App"
---

At this point, you will have a number of different pipelines and repositories set up, along with the various resources needed to keep them all communicating. Now we're going to deploy your first app into that infrastructure.

### Requirements
We'll be using a sample app template from the Cosmos library:
- [Sample Node App](https://github.com/cdk-cosmos/cosmos-sample-node-app.git)

### Steps
Get your repository url from CodeCommit. It should be in the same format as the cdk repo, but using _code_ instead of _cdk_ in the title, e.g.
https://git-codecommit.__your-region__.amazonaws.com/v1/repos/app-__app-name__-code-repo

Clone the sample app https://github.com/cdk-cosmos/cosmos-sample-node-app.git

Export your account credentials into the terminal.

git remote set-url origin https://git-codecommit.ap-southeast-2.amazonaws.com/v1/repos/app-demo-code-repo

Run your app code pipelines

Your app should then be live at https://dev.your-tld.site.net/demo where _your-tld_ is the top level domain you supplied in bin/main.ts of your cosmos core and _demo_ is the path pattern passed to the ECS service in `lib/solar-system.ts`


## Congratulations, you've bootstrapped your first Cosmos app!

### Next Steps
The key benefit of CDK Cosmos is patternising templates that can be used across your organisation. To begin building out sample templates for Lambda, or for more details about the resources included in the ECR template used in this guide, see the Template Building guides.

***

## [Next Step: Intro to Template Building](templates_intro.md)