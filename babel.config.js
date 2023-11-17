module.exports = {
    presets: ['@babel/preset-env'],
    "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+[^esm]\\.(js|jsx|mjs|cjs|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$"
      ],
};