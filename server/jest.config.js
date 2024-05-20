// jest.config.js

module.exports = {
    testEnvironment: 'node',
    testPathIgnorePatterns: [
      '/node_modules/',
      '/coverage/'
    ],
    testTimeout: 10000, // Set a longer timeout for all tests
    setupFiles: ['dotenv/config'], // Load environment variables from .env file
  };
  