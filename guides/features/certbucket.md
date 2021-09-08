---
id: "features_cert_bucket"
title: "Feature - Cert Bucket"
sidebar_label: "Feature: Cert Bucket"
---
Purpose: This feature allows you to load internal certificates (such as for use with a corporate proxy) into an s3 bucket for easy access from Cosmos Core. The

Where to use:
Cosmos Core

Props:
`certsDir`: the folder in your core cdk repo that contains your cert files

Sample usage:
        const certsDir = "src/certificates";
        cosmos.addCert(certsDir);

Currently in core cdk:

        import { SecureBucket } from "@cosmos-building-blocks/common";

        // Bucket for CA Certs
        const caCertBucket = new SecureBucket(cosmos, "caCertBucket");

        const caCertBucketPolicyStatement = new PolicyStatement({
        actions: ["s3:*"],
        principals: [
            new AccountPrincipal(devEnvConfig.account),
            new AccountPrincipal(prdEnvConfig.account),
        ],
        resources: [caCertBucket.bucketArn, `${caCertBucket.bucketArn}/*`],
        effect: Effect.ALLOW,
        });

        caCertBucket.addToResourcePolicy(caCertBucketPolicyStatement);