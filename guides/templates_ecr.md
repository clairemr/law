---
id: "templates_ecr"
title: "Building an ECR template"
sidebar_label: "ECR Template"
---

This guide is designed to walk you through adding resources to the [blank template](https://github.com/cdk-cosmos/cosmos-blank-extension-cdk) to support an Elastic Container Registry (ECR) patterned extension, in order to clarify how CDK-Cosmos works. If you would prefer to skip this step and use a pre-existing ECR template, it is available at [cosmos-extension-cdk](https://github.com/cdk-cosmos/cosmos-extension-cdk). 

### lib/ci-cd-solar-system.ts
You will need to import the DockerPipeline construct from the CDK-Cosmos building blocks

    import { DockerPipeline } from '@cosmos-building-blocks/pipeline';

Inside the export statement, above the constructor, add a code pipeline variable

    readonly codePipeline: DockerPipeline;

Inside the constructor, add the below code after `super();`. The codeRepo referenced here is the CodeCommit repo used for your app code (the default option). Remove this reference if using an alternate source. DockerPipeline provides a default build spec, but you can also pass a custom one if preferred.

    //Get codeRepo (CodeCommit) and ecrRepo from cosmos
    const { codeRepo, ecrRepo } = this.galaxy.cosmos;

    //Grant necessary ecrRepo permissions
    ecrRepo.grantPullPush(this.codePipeline.build);

    //Use docker pipeline with these params. codeRepo == AWS CodeCommit. 
    this.codePipeline = new DockerPipeline(this, 'CodePipeline', {
      pipelineName: this.galaxy.cosmos.nodeId('Code-Pipeline', '-'),
      buildName: this.galaxy.cosmos.nodeId('Code-Build', '-'),
      codeRepo: codeRepo,
      buildSpec: DockerPipeline.DefaultBuildSpec(),
      buildEnvs: {
        ECR_URL: {
          value: ecrRepo.repositoryUri,
        },
      },
    });

This section is optional but recommended. The template includes a function to allow you to add discrete stages to your cdk pipeline to deploy individual stacks by referencing the function in `bin/main.ts`. The below function allows you to add stages to your docker pipeline. If desired, add this code below `addCdkDeployEnvStageToCdkPipeline()`, within the `export` statement.

    addCdkDeployEnvStageToCodePipeline(props: { name: string; stacks: Stack[]; isManualApprovalRequired?: boolean }) {
      this.ciCd.addDeployStackStage({
        ...props,
        pipeline: this.codePipeline.pipeline,
        envs: DockerPipeline.DefaultAppBuildVersionStageEnv(),//passes app build version
      });
    }

### lib/cosmos.ts
This file sets up the Code Repository (AWS CodeCommit) and ECR Repository for your extension.

Add the following imports:

    import { Repository as CodeRepository } from "@aws-cdk/aws-codecommit";
    import { Repository as EcrRepository } from "@aws-cdk/aws-ecr";

Replace the export function with the below code. _If desired, change the EcrRepo name from "Frontend"._

    export class AppCosmosStack extends CosmosExtensionStack {
      readonly codeRepo: CodeRepository;
      readonly ecrRepo: EcrRepository;

      constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.codeRepo = new CodeRepository(this, "CodeRepo", {
          repositoryName: this.nodeId("Code-Repo", "-").toLowerCase(),
        });

        this.ecrRepo = new EcrRepository(this, "EcrRepo", {
          repositoryName: this.nodeId("Frontend", "/").toLowerCase(),
        });
      }
    }

### bin/galaxy.ts
This file will remain unchanged, as we don't need to create any resources at the galaxy (account) level. Resources are either scoped to the cosmos (management account) or solar system (dev, test, prod environment etc) level.

### bin/solar-system.ts

You will need to import the following constructs:

    import { Repository } from '@aws-cdk/aws-ecr';
    import { ContainerImage } from '@aws-cdk/aws-ecs';
    import { SsmState } from '@cosmos-building-blocks/common';
    import { EcsService } from '@cosmos-building-blocks/service';

Add app version to solar system props

    export interface AppSolarSystemProps extends SolarSystemExtensionStackProps {
      appVersion?: string;
    }

Add the following inside the constructor, after `super();`

    const { appVersion } = props || {};
    const { ecrRepo } = this.galaxy.cosmos;
    const { vpc } = this.portal;
    const { cluster, httpListener, httpsListener } = this.portal.addEcs();
    const ecrRepoClone = Repository.fromRepositoryAttributes(this, 'EcrRepo', ecrRepo); // Scope issue
    const versionState = new SsmState(this, 'VersionState', {
      name: '/' + this.nodeId('VersionState', '/'),
      value: appVersion,
    });

    new EcsService(this, 'Frontend', {
      vpc,
      cluster,
      httpListener,
      httpsListener,
      containerProps: {
        image: ContainerImage.fromEcrRepository(ecrRepoClone, versionState.value),
        port: {
          containerPort: 3000,
        },
      },
      routingProps: {
        pathPattern: '/demo',
        httpsRedirect: true,
      },
    });

### bin/main.ts
As mentioned in the intro, this file instantiates all the resources you have defined in the above files and is where you can design your Cosmos infrastructure, including AWS accounts, stacks and pipeline stages.

Add the following to imports

    import { AccountPrincipal } from '@aws-cdk/aws-iam';

In this file, you set the environment configuration for each galaxy and then instantiate a galaxy per account. Examples are included in the blank template. Duplicate these and replace the names as needed. It is essential that names match those set in your core CDK-Cosmos, e.g. `Dev` must be consistently named.

    const devEnvConfig = { account: '2222', region: 'ap-southeast-2' };
    const devGalaxy = new AppGalaxyStack(cosmos, 'Dev', {
      env: devEnvConfig,
    });

For each galaxy, add permissions to allow accessing the ECR repo (repo located in the management account)

    // Allow the Dev Galaxy to access the ecr repo
    cosmos.ecrRepo.grantPull(new AccountPrincipal(devGalaxy.account));

For each solar system, create a new solar system stack, ensuring the name matches with your core Cosmos. This allows the portal construct to use resources from core cosmos. You will also need to pass app version as a prop.

    // // Extend the Dev SolarSystem, by creating service
    // const dev = new AppSolarSystemStack(devGalaxy, 'Dev', {
    //   appVersion: process.env.APP_BUILD_VERSION,
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

As with the solar system, this should be commented out in the first run of the pipeline (as the solar system targeted by this pipeline stage has not yet been created). Adding a new stage to the pipeline will change it's definition, which will make it pause, and you will have to re-run the pipeline. This is a property of CodePipeline, and something that may be addressed in future versions of CDK-Cosmos by implementing the new CDK Pipeline construct provided by AWS. In the meantime, the blank template includes an optional CiCd stage in the pipeline, which will allow you to deploy any changes needed to the CiCd infrastructure first and minimise waiting time on additional runs of the pipeline.

    //Optional: Add CiCd deploy stage to code pipeline to deploy CiCd before other stacks
    ciCd.addCdkDeployEnvStageToCodePipeline({
        name: 'DeployCiCd',
        stacks: [ciCd],
        isManualApprovalRequired: false,
    });

    //Optional, adds CiCd deploy stage to CDK pipeline
    ciCd.ciCd?.addDeployStackStage({
      name: "DeployCiCd",
      stacks: [ciCd],
      isManualApprovalRequired: false,
    });

## Final Steps
At the end of this guide, you should have all the resources needed to upload a container to your bootstrapped extension. You will be able to test it out by uploading the [sample node app](https://github.com/cdk-cosmos/cosmos-sample-node-app) or your own app to the CodeCommit app-*-code-repo that will be created when you bootstrap your extension and running the code pipeline.

#### Once you have completed your template set up, follow the instructions in the included readme file or head back to the [Getting Started - Extension](getting_started_extension.md) guide for more information on bootstrapping your new CDK-Cosmos Extension

***