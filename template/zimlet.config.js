import path from 'path';

import * as _util from '@zimbra/zimlet-cli/dist/util.js';

export default function configure(config, env) {
	//use this function to optionally mutate the webpack configuration created by zimlet-cli

	/* From node_modules/@zimbra/zimlet-cli/dist/index.js */
	var watch = env.watch || env.w || process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development';
	var PROD = !watch;
	var cssModulesRegexp = (0, _util.crossPlatformPathRegex)(/(?:([^/@]+?)(?:-(?:pages?|components?|screens?))?\/)?src\/(?:pages|components|screens)\/(.+?)(\/[a-z0-9._-]+[.](less|s?css))?$/);

	config.resolve.extensions.unshift(".tsx", ".ts", ".sass");
	config.module.rules.unshift(
		{
			test: /\.json$/,
			exclude: [],
			loader: "json-loader"
		},
		{
			test: /\.tsx?$/,
			exclude: [
				path.resolve(__dirname, "node_modules/")
			],
			loader: "awesome-typescript-loader"
		},
		{
			test: /\.scss$/,
			use: [
				{
					loader: path.resolve(__dirname, "node_modules/@zimbra/zimlet-cli/dist/zimlet-style-loader.js"),
				},
				{
					loader: "css-loader",
					options: {
						autoprefixer: false,
						sourceMap: watch && !PROD,
						modules: true,
						namedExport: true,
						camelCase: true,
						localIdentRegExp: cssModulesRegexp,
						localIdentName: "[1]_[2]_[local]",
					}
				},
			]
		  },
	);

	for (let i = 0; i < config.module.rules.length; i++) {
		const rule = config.module.rules[i];
		if (rule.loader === "css-loader") {
			rule.loader = "typings-for-css-modules-loader";
			rule.options.modules = true;
			rule.options.namedExport = true;
			rule.options.camelCase = true;
		}
		if (rule.use != null) {
			for(let j = 0; j < rule.use.length; j++) {
				if (rule.use[j].loader === "css-loader") {
					rule.use[j].loader = "typings-for-css-modules-loader";
					rule.use[j].options.modules = true;
					rule.use[j].options.namedExport = true;
					rule.use[j].options.camelCase = true;
				}
			}
		}
		
	}

}
