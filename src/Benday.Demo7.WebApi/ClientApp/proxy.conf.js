const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(';')[0]
  : 'http://localhost:21180';

const PROXY_CONFIG = [
  {
    context: [
      '/api',
      '/swagger',
      '/lib',
      '/css',
      '/images',
      '/js',
      '/security/developmentlogin',
      '/Security/DevelopmentLogin',
      '/security',
      '/securitysummary',
    ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive',
    },
    logLevel: 'debug',
  },
];

module.exports = PROXY_CONFIG;
