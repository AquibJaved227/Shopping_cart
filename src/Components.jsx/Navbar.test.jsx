

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import '@testing-library/jest-dom';

describe('Navbar Component', () => {
  // Render the Navbar component
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Navbar cartCount={3} totalAmount={100} />
      </BrowserRouter>
    );
  });

  // 1. Check if elements are displayed
  test('renders Home and Cart links', () => {
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    const cartLink = screen.getByText(/Cart/i);
    expect(cartLink).toBeInTheDocument();
  });

  test('displays correct cart details', () => {
    const cartDetails = screen.getByText(/🛒 Cart \(3\) - \$100/i);
    expect(cartDetails).toBeInTheDocument();
  });
    
  // 2. Test navigation links
  test('Home and Cart links have correct href attributes', () => {
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toHaveAttribute('href', '/');

    const cartLink = screen.getByRole('link', { name: /Cart/i });
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

});
