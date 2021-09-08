---
id: "code_source"
title: "Code Source"
sidebar_label: "Code Source"
---

- Add github enterprise feature to core cosmos

If your code is located in AWS CodeCommit, you don't need to do anything extra - Cosmos is pre-configured to work with CodeCommit. However, if you wish to have your code in Github Enterprise, you will need to make a few changes to your app cdk.

Needs to be done in cicd solar system because you need access to portal

lib/ci-cd solar system - _Github Enterprise connection if not using CodeCommit for your app code_

std pipeline change `codeRepo: codeRepo` to `codeSource: sourceProvider`,

