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
      links: [
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
      links: [
        // {
        //   title: "Docs",
        //   items: [
        //     {
        //       label: "Style Guide",
        //       to: "docs/",
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} cdk-cosmos. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          homePageId: "README",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/cdk-cosmos/law/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
