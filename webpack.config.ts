import * as path from "path"
import * as webpack from "webpack"

const webpackConfig: webpack.Configuration = {
  entry: `./src/index.tsx`,
  output: {
    filename: `isoapp.js`,
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "webpackDist/app")
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: `babel-loader`
          }
        ]
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: `file-loader`
      }, {
        test: /\.(scss|sass)$/i,
        use: [
          {
            loader: `style-loader`
          }, {
            loader: `css-loader`
          }
        ]
      }, {
        test: /\.(css)$/i,
        use: [
          {
            loader: `style-loader`
          }, {
            loader: `css-loader`
          }
        ]
      }, {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "isofw-web": __dirname,
      "isofw-shared": path.resolve(__dirname, `../isofw-shared`),
      "isofw-rn": path.resolve(__dirname, `../isofw-rn`),
      "isofw-node": path.resolve(__dirname, `../isofw-node`),
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
}

export default webpackConfig
