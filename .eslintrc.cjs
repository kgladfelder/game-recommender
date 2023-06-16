module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:svelte/prettier", "prettier", "plugin:prettier/recommended"],
	plugins: ["@typescript-eslint", "prettier"],
	ignorePatterns: ["*.cjs"],
	overrides: [
		{ 
			files: ["*.svelte"], 
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser"
			} 
		}
	],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		extraFileExtensions: [".svelte"]
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		"prettier/prettier": "error",
	},
};
