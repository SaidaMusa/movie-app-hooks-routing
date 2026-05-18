module.exports = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  moduleNameMapper: {
    "\\.(css|scss|less)$": "identity-obj-proxy"
  },

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },

  testPathIgnorePatterns: ["/node_modules/"]
};