module.exports = {
  title: "Cdk Cosmos Law",
  tagline: "The Law that binds the Cosmos",
  url: "https://cdk-cosmos.github.io/",
  favicon: "img/favicon.ico",
  organizationName: "cdk-cosmos",
  projectName: "law",
  baseUrl: "/law/",
  themeConfig: {
    navbar: {
      title: "Cdk Cosmos",
      logo: {
        alt: "Cdk Cosmos",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "guides/",
          activeBasePath: "guides",
          label: "Guides",
          position: "left",
        },
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          href: "https://github.com/cdk-cosmos",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} cdk-cosmos. Built with Docusaurus.`,
    },
  },
  themes: [
    [
      "@docusaurus/theme-classic",
      { customCss: require.resolve("./src/css/custom.css") },
    ],
  ],
  plugins: [
    "@docusaurus/plugin-sitemap",
    "@docusaurus/plugin-content-pages",
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "guides",
        path: "guides",
        routeBasePath: "guides",
        homePageId: "intro",
        sidebarPath: require.resolve("./guides.sidebar.js"),
        editUrl: "https://github.com/cdk-cosmos/law/edit/master/",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs",
        path: "docs",
        routeBasePath: "docs",
        homePageId: "README",
        sidebarPath: require.resolve("./docs.sidebar.js"),
      },
    ],
  ],
};
