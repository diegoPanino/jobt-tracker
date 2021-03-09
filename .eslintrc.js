module.exports = {
	'env': {
		'es2021': true,
		'react-native/react-native':true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'settings':{
		"react":{
			"version": "detect",
		}
	},
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'react-native',
		'react-hooks'
	],
	'rules': {
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		"react-native/no-unused-styles": 2,
	    "react-native/split-platform-components": 1,
	    "react-native/no-inline-styles": 1,
	    "react-native/no-color-literals": 1,
	    "react-native/no-raw-text": 2,
	    "react-native/no-single-element-style-arrays": 2,
	    "react/jsx-equals-spacing": [2, "always"],
	    "react/function-component-definition": [2, {
  			"namedComponents": "arrow-function",
  			"unnamedComponents": "arrow-function"
		}],
		"react-hooks/rules-of-hooks": "error",
    	"react-hooks/exhaustive-deps": "warn"
	}
}
