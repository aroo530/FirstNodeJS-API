module.exports = {
	env: {
		node: true,
		es6: true,
		jest: true,
	},
	extends: 'eslint:recommended',
	rules: {
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-unused-vars': ['error', { args: 'all' }],
		'no-useless-catch': 'off',
	},
};
