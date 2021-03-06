module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "jest": true
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
        "react/no-array-index-key": 0,
        "prefer-spread": 0,
    },
};