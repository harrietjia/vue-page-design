const path = require('path')
const globEntry = require('webpack-glob-entry')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
	entry: globEntry('./src/*.js'),
	plugins: [
		new ManifestPlugin({
			basePath: '',
			publicPath: ''
		})
	],
	externals: {
		AMap: 'window.AMap',
		// vue: "Vue",
	},
	resolve: {
		extensions: ['.vue', '.js'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, './src')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'less-loader',
					options: {
					       lessOptions: {
					         modifyVars: {
					                 'primary-color': '#29ba9c',
								           'link-color': '#29ba9c',
				         },
	              javascriptEnabled: true,
			       }
          },
				}]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [{
					loader: "url-loader",
					options: {
						limit: 1024,
						esModule: false
					}
				}]
			}
		]
	}
}
