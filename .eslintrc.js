module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "rules": {
    },
    plugins: [
        'svelte3'
      ],
      overrides: [
        {
          files: ['*.svelte'],
          processor: 'svelte3/svelte3'
        }
      ]    
};