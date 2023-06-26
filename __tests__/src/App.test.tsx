jest.mock('../../src/assets/favicon.png', () => 'test-image-url');
//@ts-ignore
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../../src/App';

// Clean up after each test
afterEach(cleanup);

describe('App', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<App />);
    // Test if the mainpage div is in the document
    expect(getByTestId('mainpage')).toBeInTheDocument();
  });
});
