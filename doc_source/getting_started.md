# Getting Started With the Cosmos

This topic describes how to install and configure the AWS CDK and how to use Cosmos library.

**Tip**  
The [AWS Toolkit for Visual Studio Code](https://aws.amazon.com/visualstudiocode/) is an open source plug-in for Visual Studio Code that makes it easier to create, debug, and deploy applications on AWS. The toolkit provides an integrated experience for developing AWS CDK applications, including the AWS CDK Explorer feature to list your AWS CDK projects and browse the various components of the CDK application. [Install the AWS Toolkit](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/setup-toolkit.html) and learn more about [using the AWS CDK Explorer](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/cdk-explorer.html).

## Prerequisites

All CDK developers need to install [Node.js](https://nodejs.org/en/download) (>= 10.3.0), even those working in languages other than TypeScript or JavaScript. The AWS CDK Toolkit (`cdk` command-line tool) and the AWS Construct Library are developed in TypeScript and run on Node.js.

You must provide your credentials and an AWS Region to use the AWS CDK CLI, as described in [Specifying Your Credentials and Region](https://github.com/awsdocs/aws-cdk-guide/blob/master/doc_source/getting_started.md#getting_started_credentials).

---

#### TypeScript

TypeScript >= 2.7

### Installing the AWS CDK

Install the AWS CDK using the following command.

```
npm install -g aws-cdk
```

Run the following command to verify correct installation and print the version number of the AWS CDK.

```
cdk --version
```

## How to consume Cosmos

The Cosmos follows a pattern of layers. At the top we have `Cosmos` where you declare singleton items requires for your infrastructure portfolio across your different AWS accounts. Underneath there is `Galaxy` where you define all your resources which are account specific. Under each Galaxy you can have your `SolarSystems` which are your deployment environments like traditional (Dev, Test, Prod). You can create your `Core` Infrastructure in these 3 layers which can be shared across different Apps/Teams to consume it.

At the consumer side, you `extend` the `Core` infrastructure by adding any specific resources required by your App(e.g. specific ECS Task for your app which you can deploy in `Core ECS Cluster` defined earlier as part of your `Core SolarSystem`). You do this by using `Extensions`.

There are 2 sets of Template repositories which can help quickly getting started with the process.
- [cosmos-core-cdk](https://github.com/cdk-cosmos/cosmos-core-cdk) - Template for Cosmos Core Cdk App
- [cosmos-extension-cdk](https://github.com/cdk-cosmos/cosmos-extension-cdk) - Template for Cosmos Extension Cdk Apps

## Let's get started...!!!

### Core Infrastructure

1. Clone this repo (https://github.com/cdk-cosmos/cosmos-core-cdk.git).
2. Run `npm install`
3. Open `bin/main.ts` and change the project name from `Demo` to your core project name.
   - Also change cidr ranges for galaxies (Accounts)
   - Also Change anything else as needed.
   - Though We recommend you leave any solar system disabled during bootstrap (Enabled later).
4. Aws Cli Login.
5. Bootstrap Ci/Cd, run `npx cdk deploy Core-${Project}-${Account}-CiCd-SolarSystem` (Please change to your project and account name).
6. Bootstrap Accounts, run `npx cdk deploy Core-${Project}-${Account}-Galaxy` for each account that you have (you will need to change credentials).
7. Update git remote url `git remote set-url origin "https://git-codecommit.ap-southeast-2.amazonaws.com/v1/repos/core-cdk-repo"` (Please change region etc as required).
8. Enable your Solar Systems, commit, push and then deploy your changes using the pipeline (`git commit` and `git push`, run Pipeline `Core-Cdk-Pipeline`).
9. Your Done: Now use the core cdk pipeline to deploy any further changes to your app cdk code.

### Extension Infrastructure (For an App to consume the Core)

1. Clone this repo (https://github.com/cdk-cosmos/cosmos-extension-cdk.git).
2. Run `npm install`
3. Open `bin/main.ts` and change the project name from `Demo` to your app name.
4. Aws Cli Login.
5. Bootstrap, run `npx cdk deploy App-${Project}-${Account}-CiCd-SolarSystem` (Please change to your project and account name).
6. Update git remote url `git remote set-url origin "https://git-codecommit.ap-southeast-2.amazonaws.com/v1/repos/app-${Project}-cdk-repo"` (Please change Project and region etc as required).
7. Commit your changes and Push your custom version of the template to your app cdk repo, `git commit && git push`
8. Done: Now use the app cdk pipeline to deploy any further changes to your app cdk code (Pipeline Named `App-${Project}-Cdk-Pipeline`)

