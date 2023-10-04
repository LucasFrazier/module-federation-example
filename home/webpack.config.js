const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:3000/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3000,
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
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      remotes: {
        home: "home@http://localhost:3000/remoteEntry.js", // referencing self
        pdp: `promise new Promise(resolve => {
          const remoteUrl = 'http://localhost:3001/remoteEntry.js'
          const script = document.createElement('script')
          script.src = remoteUrl
          script.onload = () => {
            // the injected script has loaded and is available on window
            // we can now resolve this Promise
            const proxy = {
              get: (request) => window.pdp.get(request),
              init: (arg) => {
                try {
                  return window.pdp.init(arg)
                } catch(e) {
                  console.log('remote container already initialized')
                }
              }
            }
            resolve(proxy)
          }
          script.onerror = (error) => {
            console.error('error loading remote container (pdp)')
            const proxy = {
              get: (request) => {
                // If the service is down it will render this content
                return Promise.resolve(() => () => "PDP app is not running.");
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
        cart: `promise new Promise(resolve => {
          const remoteUrl = 'http://localhost:3002/remoteEntry.js'
          const script = document.createElement('script')
          script.src = remoteUrl
          script.onload = () => {
            // the injected script has loaded and is available on window
            // we can now resolve this Promise
            const proxy = {
              get: (request) => window.cart.get(request),
              init: (arg) => {
                try {
                  return window.cart.init(arg)
                } catch(e) {
                  console.log('remote container already initialized')
                }
              }
            }
            resolve(proxy)
          }
          script.onerror = (error) => {
            console.error('error loading remote container (cart)')
            const proxy = {
              get: (request) => {
                // If the service is down it will render this content
                return Promise.resolve(() => () => "cart app is not running.");
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
        "./Header": "./src/components/Header.jsx",
        "./Footer": "./src/components/Footer.jsx",
        "./logic": "./src/logic.js",
        "./HomeContent": "./src/components/HomeContent.jsx",
        "./state": "./src/state.js",
        "./MiniCart": "./src/components/MiniCart.jsx",
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
