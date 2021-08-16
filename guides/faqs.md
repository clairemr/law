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

