import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom/vitest';

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}));

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  GoogleAuthProvider: vi.fn(),
  onAuthStateChanged: vi.fn((_auth, callback) => {
    callback(null);
    return vi.fn();
  }),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
}));

import App from './App';

test('renders the main heading', async () => {
  render(<App />);
  const heading = await screen.findByText(/nearish/i);
  expect(heading).toBeInTheDocument();
});