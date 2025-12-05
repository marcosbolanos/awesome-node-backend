const ENV = process.env.APP_ENV ?? "dev";

module.exports = {
  extra: {
    appEnv: ENV
  }
}
