const {
  withFederatedSidecar,
  federationLoader,
} = require("@module-federation/nextjs-mf");

const deps = require("./package.json").dependencies;
let merge = require("webpack-merge");

module.exports = withFederatedSidecar({
  name: "admin",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./Banner": "./components/banner.tsx",
  },
  shared: {
    react: {
      requiredVersion: false,
      singleton: true,
    },
    // "styled-components": {
    //   eager: true,
    //   singleton: true,
    //   requiredVersion: false,
    // },
  },
})({
  webpack5: true,
  webpack(config, options) {
    const { webpack, isServer } = options;
    config.experiments = { topLevelAwait: true };

    config.module.rules.push({
      test: /_app.js/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });

    if (isServer) {
      Object.assign(config.resolve.alias, {
        admin: false,
      });
    } else {
      config.output.publicPath = "auto";
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          remoteType: "var",
          remotes: {
            admin: "admin",
          },
          shared: {
            "@module-federation/nextjs-mf/lib/noop": {
              eager: false,
            },
            react: {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            // "styled-components": {
            //   eager: true,
            //   singleton: true,
            //   requiredVersion: false,
            // },
          },
        })
      );
    }
    return merge.merge(config, {
      entry() {
        return config.entry().then((entry) => {
          return entry;
        });
      },
    });
  },
});
