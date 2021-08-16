It is recommended you keep Cosmos updated to take advantage of the latest bug fixes and features, and generally changes will be backwards compatible so you can update without issues. It is occasionally necessary to make breaking changes, due to bugs within Cosmos or changes to the AWS CDK, in which case we will clearly outline steps required to remediate issues.

To update your version of Cosmos, first check the release notes for any breaking changes. 
Update package.json in core cosmos, remove package-lock.json and `npm install` to update package-lock.json
Push changes up to your master account and run the core cdk pipeline