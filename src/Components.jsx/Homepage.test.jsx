import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Homepage from './Homepage';

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('Homepage renders main elements', async () => {
  const mockCategories = ['electronics', 'jewelery'];
  fetch.mockResolvedValueOnce({
    json: async () => mockCategories,
  }).mockResolvedValue({
    json: async () => [{ image: 'test.jpg' }],
  });

  render(
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  );

  // Check for main title
  expect(screen.getByText('Welcome to Multi-Product Shopping Web App')).toBeInTheDocument();

  // Check for categories description
  expect(screen.getByText('Below are the categories of products. Choose what you like:')).toBeInTheDocument();

  // Wait for categories to load
  await waitFor(() => {
    mockCategories.forEach(category => {
      expect(screen.getByText(category, { exact: false })).toBeInTheDocument();
    });
  });
});

test('Homepage handles fetch error', async () => {
  const consoleSpy = vi.spyOn(console, 'log');
  fetch.mockRejectedValueOnce(new Error('API error'));

  render(
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching categories', expect.any(Error));
  });

  consoleSpy.mockRestore();
});
