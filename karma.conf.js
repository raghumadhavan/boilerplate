const webpack = require('./webpack.test.config');
const isTDD = process.argv.includes('--isTDD');
const istanbulLoader = {
  test: /\.js?$/,
  use: {
    loader: 'istanbul-instrumenter-loader',
    options: { esModules: true },
  },
  enforce: 'post',
  exclude: /node_modules|\.spec\.js$/,
};

if (!isTDD) {
  webpack.module.rules.push(istanbulLoader);
}

module.exports = function(config) {
  config.set({
    basePath: '',
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 120000,
    frameworks: ['mocha'],
    files: [
      'src/tests.js',
    ],
    reporters: ['dots', 'junit', 'coverage'],
    preprocessors: {
      'src/tests.js': ['webpack', 'sourcemap'],
    },
    coverageReporter: {
      includeAllSources: true,
      dir: './coverage-client-unit',
      reporters: [
        // { type: 'text' }, // does not help with readability in console while continuously testing
        { type: 'cobertura' },
      ],
      instrumenterOptions: {
        istanbul: {
          noCompact: true,
        },
      },
    },
    webpack,
    webpackServer: {
      noInfo: true,
    },
    junitReporter: {
      outputDir: 'test-report',
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: isTDD ? ['PhantomJS'] : ['PhantomJS', 'Chrome', 'Firefox'],
    singleRun: true,
    client: {
      captureConsole: false,
    },
  });
};
