module.exports = {
  setupFilesAfterEnv: [ `@testing-library/jest-dom/extend-expect` ],
  setupFiles: [ `jest-canvas-mock` ],
  automock: false,
  clearMocks: true,
  testEnvironment: `node`,
  watchPathIgnorePatterns: [
    `node_modules`
  ],
  transform: {
    "^.+\\.[t|j]sx?$": `babel-jest`
  }
};