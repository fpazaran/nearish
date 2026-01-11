import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';
import React from 'react';
import '@testing-library/jest-dom/vitest';

test('renders the main heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/Vite \+ React/i);
  expect(linkElement).toBeInTheDocument();
});