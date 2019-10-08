import * as SentryInit from '@sentry/node';

const type = process.env.ENVIRONMENT === 'prod' ? 'production' : 'development';
const version = process.env.npm_package_version;

SentryInit.init({
  dsn: process.env.SENTRY_DNS,
  release: `${type}_${version}`,
});

export const Sentry = SentryInit;