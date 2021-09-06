

## Delete Core

## Clear everything
core, extension + bootstrapper. what else?

## Delete an extension
- Export credentials for dev account (must have policy admin access)
- `npx cdk destroy ${stacks}`, replacing ${stacks} with the correct stack names for that account (e.g. `npx cdk destroy AppCosmosSandboxDevGalaxy AppCosmosSandboxDevDevSolarSystem`)
- Repeat for any other environments
- Export credentials for main account (policy admin) and `npx cdk destroy AppCosmosSandboxMgtGalaxy AppCosmosSandboxMgtCiCdSolarSystem`
- Export credentials for main account (operator) and `npx cdk destroy AppCosmosSandboxCosmos`

At this stage, all your stacks should be deleted from Cloud Formation. Several resources get skipped during this stage and (currently) need to be manually deleted. This may change in future releases, but is not currently in the feature pipeline. This means you will need to manually delete the following resources:
__MGT Codebuild__
- App Code repo (if your code repo is not empty, it won't be deleted <-- fact check needed)
- App CDK repo
__MGT ECR__
- Only if an ECR repo was created in your bootstrap
__MGT S3__
- MGT CiCd CDK pipeline artifact bucket
- MGT CiCd Code pipeline artifact bucket
^empty buckets, then delete

If you have created other resources that can't be deleted by `cdk destroy`, you will need to manually delete them as well. Check Cloud Formation logs for events with the status DELETE_SKIPPED. Failure to do so will result in future errors with bootstrapping due to name space issues (if you are pulling down a stack to rebuild it) and may result in unnecessary costs as you're paying to store resources you don't need.

## Route 53
Before you can delete a hosted zone, you must first delete all resource record sets except the NS and SOA resource record sets for the zone apex.
(HostedZoneNotEmpty 400: The specified hosted zone contains non-required resource record sets and so cannot be deleted.)