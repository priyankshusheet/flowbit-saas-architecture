const { withModuleFederation } = require("@module-federation/enhanced/webpack");

module.exports = withModuleFederation({
  name: "shell",
  remotes: {
    supportTicketsApp: "supportTicketsApp@http://localhost:3001/remoteEntry.js",
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
})(function (webpackEnv) {
  // CRA’s existing webpack config is returned here
  return {
    // Keep CRA's default config logic
  };
});