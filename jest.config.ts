import type { Config } from 'jest';
export default async (): Promise<Config> => {
  return {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|scss|sass|png)$': 'identity-obj-proxy',
      '\\.(png)$': './__mocks__/fileMock.ts',
    },
  };
};
