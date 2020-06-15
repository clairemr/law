import * as fs from 'fs-extra';
import * as path from 'path';
import { RendererEvent } from 'typedoc/dist/lib/output/events';
import { Renderer } from 'typedoc/dist/lib/output/renderer';

import { FrontMatterComponent } from '../../components/front-matter.component';
import MarkdownTheme from '../../theme';

export default class Docusaurus2Theme extends MarkdownTheme {
  sidebarName: string;
  constructor(renderer: Renderer, basePath: string) {
    super(renderer, basePath);
    // this.indexName = 'index';
    this.sidebarName = 'sidebars.generated.js';
    renderer.addComponent('frontmatter', new FrontMatterComponent(renderer));
    this.listenTo(renderer, RendererEvent.END, this.onRendererEnd, 1024);
  }

  onRendererEnd(renderer: RendererEvent) {
    if (!this.application.options.getValue('skipSidebar')) {
      const docusarusRoot = this.findDocusaurus2Root(renderer.outputDirectory);
      if (docusarusRoot === null) {
        this.application.logger.warn(
          `[typedoc-markdown-plugin] ${this.sidebarName} not written as could not locate docusaurus root directory. In order to to implemnent ${this.sidebarName} functionality, the output directory must be a child of a 'docs' directory.`,
        );
        return;
      }
      this.writeSideBar(renderer, docusarusRoot);
    }
  }

  writeSideBar(renderer: RendererEvent, docusarusRoot: string) {
    const childDirectory = renderer.outputDirectory.split(docusarusRoot + 'docs/')[1];
    const docsRoot = childDirectory ? childDirectory + '/' : '';
    const websitePath = docusarusRoot;
    const navObject = this.getNavObject(renderer, docsRoot);
    const sidebarPath = websitePath + this.sidebarName;
    let jsonContent: any;
    if (!fs.existsSync(sidebarPath)) {
      if (!fs.existsSync(websitePath)) {
        fs.mkdirSync(websitePath);
      }
      jsonContent = JSON.parse('{}');
    } else {
      jsonContent = require(sidebarPath);
    }
    let firstKey = Object.keys(jsonContent)[0];
    if (!firstKey) {
      firstKey = 'docs';
      jsonContent[firstKey] = [];
    }
    const existingNavObject = jsonContent[firstKey].find((x) => x.label === navObject.label);
    if (existingNavObject) jsonContent[firstKey].splice(jsonContent[firstKey].indexOf(existingNavObject), 1);
    jsonContent[firstKey].push(navObject);
    try {
      fs.writeFileSync(sidebarPath, 'module.exports = ' + JSON.stringify(jsonContent, null, 2) + ';');
      this.application.logger.write(`[typedoc-plugin-markdown] ${this.sidebarName} updated at ${sidebarPath}`);
    } catch (e) {
      this.application.logger.write(`[typedoc-plugin-markdown] failed to update ${this.sidebarName} at ${sidebarPath}`);
    }
  }

  getNavObject(renderer: RendererEvent, docsRoot: string) {
    const navObject = [];
    let url = '';
    let navKey = '';
    const root = this.getNavigation(renderer.project);
    this.getNavigation(renderer.project).children.forEach((nav) => {
      nav.children.map((item) => {
        url = item.url.replace('.md', '');
        navKey = url.substr(0, url.indexOf('/'));
        if (navKey !== undefined && navKey.length) {
          navKey = navKey[0].toUpperCase() + navKey.slice(1);
        }
        let subNavObject = navObject.find((x) => x.label == navKey);
        if (!subNavObject) {
          subNavObject = this.generateNavCategory(navKey, []);
          navObject.push(subNavObject);
        }
        subNavObject.items.push(docsRoot + url);
      });
    });

    navObject.push({
      type: 'doc',
      id: docsRoot + root.url.replace('.md', ''),
    });

    return this.generateNavCategory(renderer.project.packageInfo.name, navObject);
  }

  findDocusaurus2Root(outputDirectory: string) {
    const docsName = 'docs';
    function splitPath(dir: string) {
      const parts = dir.split(/(\/|\\)/);
      if (!parts.length) {
        return parts;
      }
      return !parts[0].length ? parts.slice(1) : parts;
    }
    function testDir(parts) {
      if (parts.length === 0) {
        return null;
      }
      const p = parts.join('');
      const itdoes = fs.existsSync(path.join(p, docsName));
      return itdoes ? p : testDir(parts.slice(0, -1));
    }
    return testDir(splitPath(outputDirectory));
  }

  generateNavCategory(name: string, items: Array<any>) {
    return {
      type: 'category',
      label: name,
      items: items,
    };
  }
}
