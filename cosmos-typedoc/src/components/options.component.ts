import { Component, ContextAwareRendererComponent } from 'typedoc/dist/lib/output/components';
import { BindOption } from 'typedoc/dist/lib/utils/options';

import MarkdownTheme from '../theme';

@Component({ name: 'options' })
export class OptionsComponent extends ContextAwareRendererComponent {
  @BindOption('hideSources')
  hideSourceFiles!: boolean;

  @BindOption('hideBreadcrumbs')
  hideBreadcrumbs!: boolean;

  @BindOption('namedAnchors')
  namedAnchors!: boolean;

  @BindOption('hideIndexes')
  hideIndexes!: boolean;

  initialize() {
    super.initialize();

    MarkdownTheme.handlebars.registerHelper('ifNamedAnchors', function (options) {
      return this.namedAnchors ? options.fn(this) : options.inverse(this);
    });

    MarkdownTheme.handlebars.registerHelper('ifBreadcrumbs', function (options) {
      return this.hideBreadcrumbs ? options.inverse(this) : options.fn(this);
    });

    MarkdownTheme.handlebars.registerHelper('ifIndexes', function (options) {
      return this.hideIndexes ? options.inverse(this) : options.fn(this);
    });

    MarkdownTheme.handlebars.registerHelper('ifSources', function (options) {
      return this.hideSourceFiles ? options.inverse(this) : options.fn(this);
    });
  }
}
