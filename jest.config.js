module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/utils", "<rootDir>/components"],
    testMatch: [
        "**/__tests__/**/*.ts",
        "**/__tests__/**/*.tsx",
        "**/?(*.)+(spec|test).ts",
        "**/?(*.)+(spec|test).tsx",
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    collectCoverageFrom: [
        "utils/**/*.{ts,tsx}",
        "components/**/*.{ts,tsx}",
        "!**/*.d.ts",
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
