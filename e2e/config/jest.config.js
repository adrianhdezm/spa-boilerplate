const { PROJECT_ROOT_PATH } = require('../../config/paths');

const GLOBAL_SETUP_PATH = '<rootDir>/e2e/config/jest.setup';
const GLOBAL_TEARDOWN_PATH = '<rootDir>/e2e/config/jest.teardown';
const TESTS_ENV_PATH = '<rootDir>/e2e/config/puppeteer.env';

module.exports = {
  // The root directory that Jest should scan for tests and modules within
  rootDir: PROJECT_ROOT_PATH,

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/e2e'],
  globalSetup: GLOBAL_SETUP_PATH,
  globalTeardown: GLOBAL_TEARDOWN_PATH,
  testEnvironment: TESTS_ENV_PATH
};
