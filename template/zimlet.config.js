import path from 'path';

export default function configure(config, env) {
	//use this function to optionally mutate the webpack configuration created by zimlet-cli

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
						modules: true,
						namedExport: true,
						camelCase: true,
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
