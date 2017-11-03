import * as webpack from "webpack"
import configuration from "./webpack.config"

const modifyConf: any = configuration

modifyConf.plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
modifyConf.plugins.push(new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  compress: true,
  comments: false
}))

export default modifyConf
