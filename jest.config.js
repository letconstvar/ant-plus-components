export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/types/(.*)$": "<rootDir>/packages/types/$1",
    "^@/utils/(.*)$": "<rootDir>/packages/utils/src/$1",
    "^@/components/(.*)$": "<rootDir>/packages/components/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
