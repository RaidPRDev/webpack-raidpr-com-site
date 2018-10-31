const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack'); 
const path = require('path');

// the path(s) that should be cleaned
let pathsToClean = [
  'dist'
]

// the clean options to use
let cleanOptions = {
  	root: __dirname,
  	exclude: [],
  	verbose: false,

    // Use boolean "true" to test/emulate delete. (will not remove files).
	dry: false
};

// for HtmlWebpackPlugin plugin
const metaConfig = {
    viewport: 'width=device-width, initial-scale=1.0'
};

module.exports = {
    // mode: 'development' production,
	mode: 'production',
	entry: {
		app: './src/js/app.js',
		home: './src/js/home.js',
		about: './src/js/about.js',
		contact: './src/js/contact.js',
		productdetail: './src/js/product-detail.js',
		blog: './src/js/blog.js'
	},
	// devtool: 'inline-source-map',
	// minimal - Only output when errors or new compilation happen
	// verbose - Output everything
    // stats: 'errors-only',
    devServer: {
    	contentBase: './dist',
		//stats: 'none'
   	},
	output: {
        filename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            modernizr$: path.resolve(__dirname, './.modernizrrc.js')
        }
    },
	module: {
        rules:[
            {
                test: /\.modernizrrc.js/,
                use: 'modernizr-loader'
            },
           	{
				test:/\.css$/,
				use: [ 
						MiniCssExtractPlugin.loader, 
						'css-loader'						
					]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
					  loader: 'file-loader',
					  options: {
						name: '../img/[name].[ext]'
					  }
					}
				]
			},
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'css/fonts/[name].[ext]'
                        }
                    }
                ]
            }
		]
	},
	plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
		new HtmlWebpackPlugin({
            meta: metaConfig,
			filename: 'index.html',
			template: 'src/index.html',
			chunks: ['app', 'home'],
			inject: true
		}),
        new HtmlWebpackPlugin({
            meta: metaConfig,
			filename: 'about.html',
            template: 'src/about.html',
            chunks: ['app', 'about'],
            inject: true
        }),
		new HtmlWebpackPlugin({
            meta: metaConfig,
			filename: 'contact.html',
			template: 'src/contact.html',
			chunks: ['app', 'contact'],
			inject: true
		}),
       	/*new HtmlWebpackPlugin({
            meta: metaConfig,
			filename: 'product-detail.html',
            template: 'src/product-detail.html',
            chunks: ['app', 'productdetail'],
            inject: true
        }),
        new HtmlWebpackPlugin({
            meta: metaConfig,
			filename: 'blog.html',
            template: 'src/blog.html',
            chunks: ['app', 'blog'],
            inject: true
        }),*/
		new MiniCssExtractPlugin({
		  filename: "css/[name].css"
		}),
		new CopyWebpackPlugin([{
				from: path.resolve(__dirname, 'src/img'),
				to: 'img/'
				},
				{
					from: path.resolve(__dirname, 'src/css/fontawesome-5.0.6'),
					to: 'css/fontawesome-5.0.6/'
				}
			] 
		),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})
    ]
};