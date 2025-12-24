const config = {
  title: 'RailFinance Documentation',
  tagline: 'Internal User Manual',
  favicon: 'img/logo-kai.ico',

  url: 'http://localhost',
  baseUrl: '/',

  organizationName: 'internal',
  projectName: 'railfinance-docs',

  onBrokenLinks: 'throw',
  // onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'id',
    locales: ['id'],
  },

  plugins: [
    'docusaurus-plugin-image-zoom',
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/docs',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  ],

  themeConfig: {
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'RailFinance Logo',
        src: 'img/logo-kai.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'internalSidebar',
          position: 'left',
          label: 'Internal',
        },
        {
          type: 'docSidebar',
          sidebarId: 'externalSidebar',
          position: 'left',
          label: 'External (On Going)',
        },
      ],
    },

    zoom: {
      // zoom semua gambar di konten docs
      selector: '.markdown img, .theme-doc-markdown img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
      config: {
        margin: 24,
        scrollOffset: 0,
      },
    },
  },
};

module.exports = config;
