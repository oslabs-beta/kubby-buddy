//@ts-ignore
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../../src/App';

test('renders hello world', () => {
  render(<App />);
  const linkElement = screen.getByTestId('mainpage');
  expect(linkElement).toBeInTheDocument();
});
