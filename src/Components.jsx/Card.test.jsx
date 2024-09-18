


import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Card from './Card';
import { vi } from 'vitest';

// Mock global fetch function if needed
// global.fetch = vi.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ /* mock API response */ }),
//   })
// );

test('renders Card component with title and image and calls onViewProducts when button is clicked', async () => {
  const mockOnViewProducts = vi.fn(); // Mock function to track button clicks
  
  // Render the Card component
  render(
    <Card
      title="Sample Title"
      imageUrl="/path/to/image.jpg"
      onViewProducts={mockOnViewProducts}
    />
  );

  // Check if the title is rendered
  const titleElement = screen.getByText('Sample Title');
  expect(titleElement).toBeInTheDocument();

  // Check if the image is rendered with the correct src and alt attributes
  const imageElement = screen.getByAltText('Sample Title');
  expect(imageElement).toHaveAttribute('src', '/path/to/image.jpg');

  // Check if the button is rendered and clickable
  const buttonElement = screen.getByText('View Products');
  expect(buttonElement).toBeInTheDocument();

  // Simulate button click
  userEvent.click(buttonElement);

  // Wait for the mock function to be called
  await waitFor(() => {
    expect(mockOnViewProducts).toHaveBeenCalledTimes(1);
  });
});
