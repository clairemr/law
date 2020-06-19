import * as path from 'path';
import * as fs from 'fs';
import { Application, TSConfigReader, ParameterType } from 'typedoc';
import { MarkdownPlugin } from './plugin';
import { GitHubPlugin } from './GitHubPlugin';
import { NoInheritPlugin } from './no-inherit';

const PROJECTS = [
  'packages/@cdk-cosmos/core/src',
  'packages/@cosmos-building-blocks/common/src',
  'packages/@cosmos-building-blocks/network/src',
  'packages/@cosmos-building-blocks/pipeline/src',
  'packages/@cosmos-building-blocks/service/src',
  'packages/@cdk-cosmos/cdk-credentials-plugin/src',
];

const app = new Application();
app.options.addReader(new TSConfigReader());
addOptions();
app.converter.addComponent('markdown', new MarkdownPlugin(app.converter));

// TODO: remove when released https://github.com/TypeStrong/typedoc/compare/v0.17.7...master
app.converter.removeComponent('git-hub');
app.converter.addComponent('git-hub', new GitHubPlugin(app.converter));

// No Inherit plugin
app.converter.addComponent('no-inherit', new NoInheritPlugin(app.converter));

app.bootstrap({
  mode: 'file',
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
  excludeProtected: true,
  theme: 'docusaurus2',
  plugin: [],
});

app.options.setValue('noInheritDefault', true);

// Copy Cosmos Readme as the index of the Doc Site
const cosmosReadme = fs.readFileSync('../cosmos/README.md').toString();
const cosmosReadmeFrontMatter = `---
id: "README"
title: "CDK Cosmos"
sidebar_label: "README"
---
`;
if (!fs.existsSync('docs')) fs.mkdirSync('docs');
fs.writeFileSync('docs/README.md', cosmosReadmeFrontMatter + '\n\n' + cosmosReadme);

// Generate docs for each project
PROJECTS.map((project) => app.convert(app.expandInputFiles([path.join('../cosmos', project)]))).forEach((project) => {
  const success = app.generateDocs(project, path.join('docs', project.name));
  console.log(`${project.name}: ${success ? 'Success' : 'Fail'}`);
});

function addOptions() {
  app.options.addDeclaration({
    help: 'Markdown Plugin: Deprecated in favour of theme.',
    name: 'platform',
    type: ParameterType.String,
  });

  app.options.addDeclaration({
    help: 'Markdown Plugin: Deprecated.',
    name: 'hideProjectTitle',
    type: ParameterType.Boolean,
  });

  app.options.addDeclaration({
    help: 'Markdown Plugin: Do not print source file link rendering.',
    name: 'hideSources',
    type: ParameterType.Boolean,
  });

  app.options.addDeclaration({
    help: 'Markdown Plugin: Do not print breadcrumbs.',
    name: 'hideBreadcrumbs',
    type: ParameterType.Boolean,
  });

  app.options.addDeclaration({
    help: 'Markdown Plugin: Do not print indexes.',
    name: 'hideIndexes',
    type: ParameterType.Boolean,
  });

  app.options.addDeclaration({
    help:
      'Markdown Plugin: Use HTML named anchors as fragment identifiers for engines that do not automatically assign header ids.',
    name: 'namedAnchors',
    type: ParameterType.Boolean,
  });

  app.options.addDeclaration({
    help:
      'Markdown Plugin: Use long navigation title instead of default short one (applicable to navigation / front-matter only).',
    name: 'longTitle',
    type: ParameterType.Boolean,
  });

  app.options.addDeclaration({
    help: 'Skips updating of the sidebar.json file when used with docusaurus or docusaurus2 theme',
    name: 'skipSidebar',
    type: ParameterType.Boolean,
  });

  app.options.addDeclaration({
    help: 'Enables noInherit by default',
    name: 'noInheritDefault',
    type: ParameterType.Boolean,
  });
}
