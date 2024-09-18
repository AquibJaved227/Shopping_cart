

// Homepage.jsx
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Card from './Card';
import '../App.css';

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]); // Cart items with { id, price, quantity }
  const [totalAmount, setTotalAmount] = useState(0);



  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then(async (categories) => {
        const categoryImages = await Promise.all(
          categories.map(async (category) => {
            const response = await fetch(`https://fakestoreapi.com/products/category/${category}?limit=1`);
            const products = await response.json();
            return { category, imageURL: products[0].image };
          })
        );
        setCategories(categoryImages);
      })
      .catch((error) => console.log('Error fetching categories', error));
  }, []);



  const handleAddToCart = (id, price, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);  // return a single object
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { id, price, quantity }];
      }
    });
  };

  useEffect(() => {
    const newTotalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalAmount(newTotalAmount);
  }, [cartItems]);

  return (

    <div data-testid="homepage">
      <Navbar cartCount={cartItems.reduce((count, item) => count + item.quantity, 0)} totalAmount={totalAmount} />
      <h1>Welcome to Multi-Product Shopping Web App</h1>
      <div>
        <p>Below are the categories of products. Choose what you like:</p>
        <div className="categories-container">
          {categories.map((categoryData, index) => (
            <div key={index}>
              <Link to={`category/${categoryData.category}`}>
                <Card
                  title={categoryData.category}
                  imageUrl={categoryData.imageURL}
                  onViewProducts={() => {}}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Outlet context={{ handleAddToCart }} /> {/* Pass handleAddToCart using context */}
    </div>
  );
};

export default Homepage;
