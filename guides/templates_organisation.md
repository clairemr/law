

You may want to provide specific resources to customise Cosmos for your organisation

- Custom bootstrapping
- Compliance
- Internet connections

How to do so

Remove import { AccountPrincipal } from '@aws-cdk/aws-iam'; from template instructions once it's been re-added to the blank template

## Remaining questions

what needs to be added to core cosmos to support these things?

how is cicd solar system different to cosmos stack? other than cdk repo, surely the rest could go in cicd solar system?

_cicd ss Question: Is a VPC always required? Some apps might just use lambda & dynamodb, outside of vpc_

Need more explanation in ecr template for lib/solar-system.ts

I want to make a change without running the pipeline through prod:
- Make sure you have a CiCd stage in your pipeline, above prod
- Currently you'll need to manually deploy the link stack as well

### Notes to add somewhere
- You won't get much information about the bootstrapping process from your terminal. You can, however, view the logs in CloudFormation to troubleshoot if needed.


route 53
ecs uses path based routing, front door uses aliases


### Buildspec builder

custom build spec. Pass `buildSpec` instead of `buildSpec: StandardPipeline.DefaultBuildSpec(),`

        import { BuildSpecBuilder } from '@cosmos-building-blocks/pipeline';
        const buildSpec = new BuildSpecBuilder()
            .addRuntime('nodejs', '12')
            .addCommands('pre_build', 'make install', 'export APP_BUILD_VERSION=$(make version)')
            .addCommands('build', 'make build')
            .addCommands('post_build', `export CODE_BUCKET=${codeBucket.bucketName}`, 'make zip', 'make push')
            .addExportedVariables('APP_BUILD_VERSION');