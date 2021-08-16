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

git remote set-url origin https://git-codecommit.ap-southeast-2.amazonaws.com/v1/repos/app-cosmossandbox-code-repo

Run your app cdk & code pipelines