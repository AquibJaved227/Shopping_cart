

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams, useOutletContext, BrowserRouter } from 'react-router-dom';
import Products from './Products';
import { vi } from 'vitest';  // Import vitest functions

// Mock fetch to return sample data
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, title: 'Sample Product', price: 99.99, image: '/path/to/image.jpg' }
    ]),
  })
);

// Mock react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: vi.fn(),
    useOutletContext: vi.fn(() => ({
      handleAddToCart: vi.fn(),
    })),
  };
});

describe('Products component', () => {
  test('renders correctly with simulated category name', async () => {
    const mockHandleAddToCart = vi.fn();
    useParams.mockReturnValue({ categoryName: 'jewelery' });
    vi.mocked(useOutletContext).mockReturnValue({
      handleAddToCart: mockHandleAddToCart,
    });

    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    // Check that the product image is rendered correctly
    const imageElement = await screen.findByAltText('Sample Product');
    expect(imageElement).toHaveAttribute('src', '/path/to/image.jpg');

    // Check that the product title is rendered correctly
    const productTitle = await screen.findByText('Sample Product');
    expect(productTitle).toBeInTheDocument();

    // Check that the price is rendered correctly
    const productPrice = await screen.findByText('$99.99');
    expect(productPrice).toBeInTheDocument();

    // Check initial quantity and simulate increment
    const clickingButtonElement = screen.getByText('0');
    expect(clickingButtonElement).toBeInTheDocument();

    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);

    // After clicking increment, quantity should be updated to 1
    const updatedQuantity = screen.getByText('1');
    expect(updatedQuantity).toBeInTheDocument();

    // Simulate decrement button click
    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);

    // After clicking decrement, quantity should be updated back to 0
    const finalQuantity = screen.getByText('0');
    expect(finalQuantity).toBeInTheDocument();

    // Simulate Add to Cart button click
    const addToCartButtonClickElement = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButtonClickElement);
  
    await waitFor(() => {
      expect(mockHandleAddToCart).toHaveBeenCalledWith(1, 99.99, 0);
    });
  });
});
