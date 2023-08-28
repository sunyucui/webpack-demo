const { REACT_APP_ENV } = process.env;
const domains = {
  dev: {
    api: 'http://crm.dev.hsmob.com',
    wmc: 'https://api-dev.weimobwmc.com',
    sso: 'http://sso.dev.hsmob.com',
    wm: 'http://statistic-dev.weimobdc.com',
  },

  local: {
    api: 'http://crm.dev.hsmob.com',
    wmc: 'https://api-dev.weimobwmc.com',
    sso: 'http://sso.dev.hsmob.com',
    wm: 'http://statistic-dev.weimobdc.com',
  },

  qa: {
    api: 'http://crm.qa.hsmob.com',
    wmc: 'http://api-qa.weimobwmc.com',
    sso: 'http://sso.qa.hsmob.com',
    wm: 'https://statistic-qa.weimobdc.com',
  },

  pl: {
    api: 'http://nirvana.pl.hsmob.com',
    wmc: 'https://api-pl.weimobwmc.com',
    sso: 'http://sso.pl.hsmob.com',
    wm: 'https://statistic-qa.weimobdc.com',
  },

  online: {
    api: 'http://niepan.weimob.com',
    wmc: 'https://api.weimobwmc.com',
    sso: 'http://sso.hsmob.com',
    wm: 'https://statistic.weimobdc.com',
  },
};
const domain = (REACT_APP_ENV && domains[REACT_APP_ENV]) || {};

exports.proxy= {
  '/api/': {
    target: domain.api,
    pathRewrite: {
      '^/api/': '/api/',
    },
    changeOrigin: true,
  },

  // 新后台的转发规则
  '/napi/nbiz/ss/': {
    target: domain.api, // 'http://crm.dev.hsmob.com'  domain.api
    // target: 'http://172.19.7.73:8090', // 'http://crm.dev.hsmob.com'  domain.api
    pathRewrite: {
      '^/napi/nbiz/ss/': '/napi/nbiz/ss/',
    },
    changeOrigin: true,
  },

  '/wmc/': {
    target: domain.wmc,
    pathRewrite: {
      '^/wmc/': '/media/',
    },
    changeOrigin: true,
  },

  '/sso/': {
    target: domain.sso,
    pathRewrite: {
      '^/sso/': '/',
    },
    changeOrigin: true,
  },

  '/wm/': {
    target: domain.wm,
    pathRewrite: {
      '^/wm/': '/wm/',
    },
    changeOrigin: true,
  },

  '/mock/': {
    target: 'http://localhost:8080',
    changeOrigin: false,
  },
};
