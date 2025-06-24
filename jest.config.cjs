module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  setupFiles: ['./src/tests/setEnv.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!your-module-to-transform)'
  ]
};