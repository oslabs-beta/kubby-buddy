module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss|sass|png)$': 'identity-obj-proxy',
    '\\.(png)$': './__mocks__/fileMock.ts',
  },
};
