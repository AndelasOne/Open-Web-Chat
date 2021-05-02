module.exports = {

    "testMatch": [
      "**/src/__test__/**/*.+(ts|tsx|js)",
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "testEnvironment": 'node'
  }