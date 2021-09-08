### Issues faced when setting up cosmos test accounts
##
5:36:37 AM | UPDATE_FAILED        | AWS::ElasticLoadBalancingV2::LoadBalancer | BYOD/Mgt/Internet/Nlb (Nlb) All subnets must belong to the same VPC: 'vpc-012ec3cb70b7a70b1' (Service: AmazonElasticLoadBalancing; Status Code: 400; Error Code: InvalidConfigurationRequest; Request ID: e16a2a9a-3e46-4265-8e2a-b24f1cf7bbc2; Proxy: null)

#### Internet connection issues
- tried to run pipeline with IAG internet addition, failed at last step
- tried removing internet connection, failed at cdk diff step
- cdk synth returned below error
`s121834@IAG-C02FJ45BMD6R iag-cosmos-core-cdk-template % cdk synth
Unable to resolve plugin @cdk-cosmos/cdk-credentials-plugin: Error: Cannot find module '@cdk-cosmos/cdk-credentials-plugin'
Require stack:
- /Users/s121834/.nvm/versions/node/v14.17.0/lib/node_modules/cdk/node_modules/aws-cdk/bin/cdk.js
- /Users/s121834/.nvm/versions/node/v14.17.0/lib/node_modules/cdk/node_modules/aws-cdk/bin/cdk
- /Users/s121834/.nvm/versions/node/v14.17.0/lib/node_modules/cdk/bin/cdk
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:885:15)
    at Function.resolve (internal/modules/cjs/helpers.js:94:19)
    at tryResolve (/Users/s121834/.nvm/versions/node/v14.17.0/lib/node_modules/cdk/node_modules/aws-cdk/bin/cdk.ts:188:24)
    at loadPlugins (/Users/s121834/.nvm/versions/node/v14.17.0/lib/node_modules/cdk/node_modules/aws-cdk/bin/cdk.ts:178:26)
    at initCommandLine (/Users/s121834/.nvm/versions/node/v14.17.0/lib/node_modules/cdk/node_modules/aws-cdk/bin/cdk.ts:196:3)
Unable to resolve plug-in: @cdk-cosmos/cdk-credentials-plugin`

getting stuck at creating AWS::ECS::Service BYOD/Mgt/Internet?ProxyService/Service (ProxyService)
^possibly the proxy agent in cdk-credentials-plugin/lib ?



deleted app (npx cdk destroy  for each stack, exporting dev credentials for dev stack)
tried to re-bootstrap, getting 
    fail: Bucket named 'cdk-toolkit-assets-11111-ap-southeast-2' exists, but not in account 11111. Wrong account?
Need to manually delete s3 buckets first


core bootstrapping things you need across all accounts, deploy role from mgt to dev/prod, vpcs, load balancers etc
extensions scoped to individual apps, decoupled from each other and the core by importing resources from the core e.g. takes load balancer from vpc in the core

apps in dev are running on vpc in dev account. sharing happens within the same account
solar systems encapsulate one group of apps. you can share a vpc between solar systems or sometimes they have one vpc. vpc not shared from mgt to dev, shared between same account
why?
understanding is vpc created in one centralised mgt acct and shared to app teams to use in their accounts

building blocks are constructs that are not related to cosmos constructs.
technically cosmos is a framework/pattern, some cosmos constructs require underlying constructs to exist before you put it in. your accounts need to be bootstrapped in cosmos for features. BBs can be used in any account iwht cdk e.g. pipeline. those constructs are put into building blocks and often used in features which are plugged into the cosmos

when we create mgt galaxy ext stack (instanstiate in ext), we canll it Mgt. not just an arbitrary name. internal logic of galaxy extension stack uses id we pass it (Mgt) to reference core galaxy of same name. names need to match, they're mapped to each other. it's about decoupling core from apps, this is how ext knows which resources to import from core


these are the scopes of the resources
in core, defined cosmos
then we have galaxies which are account scoped. mgtGalaxy = mgt acct etc
then solar systems core stacks = arbitrary groups of resources, usually scoped to (up to you what they're scoped to) but in devops acct we have lots of apps just in dev. devMinion ss is to contain minions

back in ext, a lot of the stuff in soalr system is just guessing what you might need, e.g. new templates will covers extensions for serverless app, or fargate


how to get cidr ranges for new cosmos core

_If you see error subprocess 127 when bootstrapping core or extensions, try copying the plaintext here:_ npx cdk --app "node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js" deploy

_If you see "fail: Bucket named 'cdk-toolkit-assets-YOURACCOUNTNUMBER-ap-southeast-2' exists, but not in account YOURACCOUNTNUMBER. Wrong account?" check your IAM permissions_





Required because ext imports a bunch of stuff from the core. portal = imports from core. we got the resources defined in core when we create the solar system. we create them in the core but scoping them to the dev galaxy (dev acct). https listenser already there as part of the dev galaxy core Core*DevDevSolarSystem (includes alb, https listener, vpc etc), imported via naming convention through portal to be used in ext. all exts in this solar system will use the same alb. this.portal.addEcs() is a way of adding the functioanlity to these clusters


code pulls from the repo (build stage), then deploys to the various envs
cdk pipeline just deploys cdk

Note on deploy stages: can have a deploy stage for each env in pipeline, can combine stacks or can keep them all in the final, catch all deploy stage <-- does this redeploy things that have already been deployed on this run of the pipeline?
Splitting them up allows you to retry sections and not have the entire thing rollback if one stack fails (my assumption)

If you have a deploy CiCd stage in your pipeline, when you make changes to the pipeline, it will stop on the CiCd stage and show as 'Cancelled', even if successful. If you try to retry the stage, you will get an error like this:
`The stage named DeployCiCd in the App-MyApp-Cdk-Pipeline pipeline can't be retried now. Either it contains no failed actions, the execution '...' is already superseded, or the pipeline definition has changed since the action(s) failed.`

This is the expected behaviour. Deploying CiCd changes requires re-running the pipeline so those stages run, so putting this stage early in the pipeline means you don't have to wait for the entire pipeline to run just so you can start it again.