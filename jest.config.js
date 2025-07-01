// jest.config.mjs
export default {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    maxWorkers: 1,
  };
  