import * as path from 'path';
import { Application, TSConfigReader, ParameterType } from 'typedoc';
import { MarkdownPlugin } from './plugin';

const PROJECTS = [
  'packages/@cdk-cosmos/core/src/index.ts',
  'packages/@cosmos-building-blocks/common/src/index.ts',
  'packages/@cosmos-building-blocks/network/src/index.ts',
  'packages/@cosmos-building-blocks/pipeline/src/index.ts',
  'packages/@cosmos-building-blocks/service/src/index.ts',
  'packages/@cdk-cosmos/cdk-credentials-plugin/src/index.ts',
];

const app = new Application();
app.options.addReader(new TSConfigReader());
addOptions();
app.converter.addComponent('markdown', new MarkdownPlugin(app.converter));
app.bootstrap({
  mode: 'library',
  excludeExternals: true,
  theme: 'docusaurus2',
  plugin: [],
});

PROJECTS.map((x) => app.convert([path.join('../cosmos', x)])).forEach((project) => {
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
}
