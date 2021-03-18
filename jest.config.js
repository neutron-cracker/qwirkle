module.exports = {
  preset: 'ts-jest',
  setupFiles: ['./tests/mockEventTarget.js'],
  testEnvironment: 'node',
};