import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';

let rootElement;
if (typeof window !== undefined) {
  rootElement = document.getElementById('root');
}
// const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
