module.exports = {
    presets: ['@babel/preset-env',
    {
      targets: {
        node: 'current'
      }
    }
  ],
    "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+[^esm]\\.(js|jsx|mjs|cjs|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$"
      ],
};