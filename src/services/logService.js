import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn:
      "https://1397b5c34a1343b2b6e6d4851cfa7ad6@o382445.ingest.sentry.io/5297437",
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
