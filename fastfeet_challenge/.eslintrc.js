module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'prettier'
    ],
    plugins: ['prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        "prettier/prettier": "error",
        "class-methods-use-this": "off",   //all methods of class should use this but it will be off
        "no-param-reassign": "off", // allow me to receive a param and make changes in it because lint does not allow it (required because we are using sequelize)
        "camelcase": "off",
        "no-unused-vars": ["error", {"argsIgnorePattern": "next"}] //allow me invoke 'next' even not using
    },
};
