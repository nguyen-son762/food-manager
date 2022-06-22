const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
    },
    plugins: [
      ...(process.env.ENABLE_ANALYZER
        ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
          }),
        ]
        : []),
    ],
  },
};
