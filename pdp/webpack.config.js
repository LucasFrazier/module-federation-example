const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:3001/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "pdp",
      filename: "remoteEntry.js",
      remotes: {
        home: "home@http://localhost:3000/remoteEntry.js",
        pdp: "pdp@http://localhost:3001/remoteEntry.js",
        cart: "cart@http://localhost:3002/remoteEntry.js",
        reviews: `promise new Promise(resolve => {
          const remoteUrl = 'http://localhost:3003/remoteEntry.js'
          const script = document.createElement('script')
          script.src = remoteUrl
          script.onload = () => {
            // the injected script has loaded and is available on window
            // we can now resolve this Promise
            const proxy = {
              get: (request) => window.reviews.get(request),
              init: (arg) => {
                try {
                  return window.reviews.init(arg)
                } catch(e) {
                  console.log('remote container already initialized')
                }
              }
            }
            resolve(proxy)
          }
          script.onerror = (error) => {
            console.error('error loading remote container (reviews)')
            const proxy = {
              get: (request) => {
                // If the service is down it will render this content
                return Promise.resolve(() => () => "reviews app is not running.");
              },
              init: (arg) => {
                return;
              }
            }
            resolve(proxy)
          }
          // inject this script with the src set to the remoteEntry.js
          document.head.appendChild(script);
        })
        `,
      },
      exposes: {
        "./PDPContent": "./src/PDPContent.jsx",
        "./routes": "./src/routes.js",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
