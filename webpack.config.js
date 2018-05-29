const path = require('path');

var config = {
		mode: 'development',
		entry: './src/main.js',

		output: {
			filename: 'index.js',
			path: path.resolve(__dirname, 'build'),
			publicPath: '/build/' 
		},

		devServer: {
			contentBase: path.join(__dirname, "build"),
			port: 4000
		},

		module: {
			rules: [ 
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: ['es2015', 'react']
					}
				},
				{
					test: /\.css$/,
					use: [ 'style-loader', 'css-loader' ]
				}
			]
		} 

}

module.exports = config;