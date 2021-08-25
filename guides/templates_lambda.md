---
id: "building_lambda_template"
title: "Building a Lambda Template"
sidebar_label: "Lambda Template"
---

This guide is designed to walk you through adding resources to the [blank template](https://github.com/cdk-cosmos/cosmos-blank-extension-cdk) to support an AWS Lambda patterned extension, in order to clarify how CDK-Cosmos works. We will be creating a lambda behind an ALB within a VPC to create a private site.

### lib/ci-cd-solar-system.ts
You will need to import AWS s3 bucket and StandardPipeline from the CDK-Cosmos building blocks.

    import { Bucket } from '@aws-cdk/aws-s3';
    import { StandardPipeline } from '@cosmos-building-blocks/pipeline';

To the exports, you will need to add a lambda bucket and a standard pipeline. Currently recommending standard pipeline for lambda, which requires the use of a Makefile in your app code, but in future there may be a custom lambda pipeline. 

    readonly lambdaBucket: Bucket;
    readonly codePipeline: StandardPipeline;

Inside the constructor, add the below code after `super();`. StandardPipeline provides a default build spec, but you can also pass a custom one if preferred.
    
    //get app code repo (CodeCommit) and code bucket (s3) from cosmos
    const { codeRepo, codeBucket } = this.galaxy.cosmos;

    //StandardPipeline requires a Makefile in your app code
    this.codePipeline = new StandardPipeline(this, 'CodePipeline', {
      pipelineName: this.galaxy.cosmos.nodeId('Code-Pipeline', '-'),
      buildName: this.galaxy.cosmos.nodeId('Code-Build', '-'),
      codeRepo: codeRepo,
      buildSpec: StandardPipeline.DefaultBuildSpec(),
    });

    //Grant necessary code bucket permissions
    codeBucket.grantWrite(this.codePipeline.buildRole);

This section is optional but recommended. The template includes a function to allow you to add discrete stages to your cdk pipeline to deploy individual stacks by referencing the function in `bin/main.ts`. The below function allows you to add stages to your standard pipeline. If desired, add this code below `addCdkDeployEnvStageToCdkPipeline()`, within the `export` statement.

    addCdkDeployEnvStageToCodePipeline(props: { name: string; stacks: Stack[]; isManualApprovalRequired?: boolean }) {
        this.ciCd.addDeployStackStage({
        ...props,
        pipeline: this.codePipeline.pipeline,
        envs: StandardPipeline.DefaultAppBuildVersionStageEnv(),//passes app build version
        });
    }


### lib/cosmos.ts
This file sets up the Code Repository (AWS CodeCommit) and Code Bucket (s3) for your extension.

Add the following imports:

    import { Repository as CodeRepository } from "@aws-cdk/aws-codecommit";
    import { Bucket } from '@aws-cdk/aws-s3';

Replace the export function with the below code. 

    export class AppCosmosStack extends CosmosExtensionStack {
      readonly codeBucket: Bucket;
      readonly codeRepo: CodeRepository;

      constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.codeRepo = new CodeRepository(this, 'CodeRepo', {
          repositoryName: this.nodeId('Code-Repo', '-').toLowerCase(),
        });

        this.codeBucket = new Bucket(this, 'CodeBucket', {
          bucketName: this.nodeId('Code-Bucket', '-').toLowerCase(),
        });
      }
    }

### bin/galaxy.ts
This file will remain unchanged, as we don't need to create any resources at the galaxy (account) level. Resources are either scoped to the cosmos (management account) or solar system (dev, test, prod environment etc) level.

### lib/solar-system.ts

You will need to import the following constructs:

    import { Bucket } from '@aws-cdk/aws-s3';
    import { SolarSystemExtensionStack, SolarSystemExtensionStackProps } from '@cdk-cosmos/core';
    import { Function, Runtime, Code, LayerVersion } from '@aws-cdk/aws-lambda';
    import { Key } from '@aws-cdk/aws-kms';
    import { ApplicationTargetGroup, ListenerCondition } from '@aws-cdk/aws-elasticloadbalancingv2';
    import { LambdaTarget } from '@aws-cdk/aws-elasticloadbalancingv2-targets';
    import { AppGalaxyStack } from '.';

Add tag to solar system props

    export interface AppSolarSystemProps extends SolarSystemExtensionStackProps {
      tag?: string;
    }

Add the following inside the constructor, after `super();`

    const { tag } = props || {};
    const { codeBucket } = this.galaxy.cosmos;
    const { vpc } = this.portal;
    const { alb, httpsListener } = this.portal.addEcs();

    const serverDependenciesLayer = new LayerVersion(this, 'ServerDependenciesLayer', {
      code: Code.fromBucket(codeBucket, `server-layer-${tag}.zip`),
      compatibleRuntimes: [Runtime.NODEJS_12_X],
    });

    const serverFunction = new Function(this, 'ServerFunction', {
      handler: 'app.lambdaHandler',
      code: Code.fromBucket(codeBucket, `server-${tag}.zip`),
      runtime: Runtime.NODEJS_12_X,
      layers: [serverDependenciesLayer],
      environment: {
        REGION: 'ap-southeast-2',
      },
      vpc,
    });

    const serverTargetGroup = new ApplicationTargetGroup(this, 'ServerTargetGroup', {
      targets: [new LambdaTarget(serverFunction)],
    });

    const serverTargetConditions = [ListenerCondition.hostHeaders([recordName])];

    httpsListener.addTargetGroups('ServerTargets', {
      conditions: [ListenerCondition.hostHeaders([recordName])],
      priority: 9500,
      targetGroups: [serverTargetGroup],
    });

    new ARecord(this, 'Alias', {
      zone: this.portal.zone,
      recordName,
      target: RecordTarget.fromAlias(new LoadBalancerTarget(alb)),
    });








### bin/main.ts
As mentioned in the intro, this file instantiates all the resources you have defined in the above files and is where you can design your Cosmos infrastructure, including AWS accounts, stacks and pipeline stages.

Add the following to imports

    import { AccountPrincipal } from '@aws-cdk/aws-iam';

To the cosmos stack (after `const cosmos`), add a resource policy to the code bucket. You will need to add all environments as account principals so they can access the zip file of the lambda code, which is stored in the management account.

    cosmos.codeBucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ['s3:*'],
        principals: [new AccountPrincipal(devEnvConfig.account), new AccountPrincipal(prdEnvConfig.account)],
        resources: [cosmos.codeBucket.bucketArn, `${cosmos.codeBucket.bucketArn}/*`],
        effect: Effect.ALLOW,
      })
    );

In this file, you set the environment configuration for each galaxy and then instantiate a galaxy per environment. Examples are included in the blank template. Duplicate these and replace the names as needed. It is essential that names match those set in your core CDK-Cosmos, e.g. `Dev` must be consistently named.

    const devEnvConfig = { account: '2222', region: 'ap-southeast-2' };
    const devGalaxy = new AppGalaxyStack(cosmos, 'Dev', {
      env: devEnvConfig,
    });

For each solar system, create a new solar system stack, ensuring the name matches with your core Cosmos. This allows the portal construct to use resources from core cosmos. You will also need to pass app version as a prop.

    // // Extend the Dev SolarSystem, by creating service
    // const dev = new AppSolarSystemStack(devGalaxy, 'Dev', {
    //   tag: process.env.APP_BUILD_VERSION || 'v0.0.0',,
    // });

 > __Important note with solar systems:__ Currently, solar systems must be commented out in the first run of the bootstrapper. You can then uncomment solar systems, push up your changes and re-run the cdk pipeline. See [Getting Started - Extension # Solar Systems](getting_started_extension#solar-systems) for more information. 

Optionally, add a deployment stage in the pipeline to target specific solar systems (can pass one or multiple stacks). If not, all stacks will be deployed in the final deploy stage of the pipeline. It is, however, recommended to separate dev and prod as a minimum. 

    // // Add a Deployment stage in App Pipeline to target this
    // ciCd.addCdkDeployEnvStageToCodePipeline({
    //   name: 'DeployDev',
    //   stacks: [dev],
    //   isManualApprovalRequired: false,
    // });

Again optionally, you can also add a separate stage in the CDK pipeline to target specific stacks

    // ciCd.addCdkDeployEnvStageToCdkPipeline({
    //   name: 'DeployDev',
    //   stacks: [dev],
    //   isManualApprovalRequired: false,
    // });

As with the solar system, this should be commented out in the first run (as the solar system targeted by this pipeline stage has not yet been created). When you re-run the cdk pipeline, it will change itself to add the new stage. Changes to the pipeline will make it pause, and you will have to re-run it again. This is a property of CodePipeline, and something that may be addressed in future versions of CDK-Cosmos by implementing the new CDK Pipeline construct provided by AWS. In the meantime, the blank template includes an optional CiCd stage in the pipeline, which will allow you to deploy any changes needed to the CiCd infrastructure first and minimise waiting time on additional runs of the pipeline.

    //Optional: Add CiCd deploy stage to code pipeline to deploy CiCd before other stacks
    ciCd.addCdkDeployEnvStageToCodePipeline({
        name: 'DeployCiCd',
        stacks: [ciCd],
        isManualApprovalRequired: false,
    });

    //Optional: Add CiCd deploy stage to CDK pipeline to deploy CiCd before other stacks
    ciCd.ciCd?.addDeployStackStage({
        name: "DeployCiCd",
        stacks: [ciCd],
        isManualApprovalRequired: false,
    });

## Final Steps
At the end of this guide, you should have all the resources needed to upload a lambda function to your bootstrapped extension. You will be able to test it out by uploading your app to the CodeCommit app-*-code-repo that will be created when you bootstrap your extension and running the code pipeline.

#### Once you have completed your template set up, follow the instructions in the included readme file or head back to the [Getting Started - Extension](getting_started_extension.md) guide for more information on bootstrapping your new CDK-Cosmos Extension

***

