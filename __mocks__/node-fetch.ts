const mockJsonPromise = Promise.resolve({ data: 'data' });
const mockFetchPromise = Promise.resolve({
  // 3
  json: () => mockJsonPromise,
});
jest.mock('node-fetch', () =>
  jest.fn().mockImplementation(() => mockFetchPromise)
);
