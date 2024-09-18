

// Products.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

const Products = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [productQuantities, setProductQuantities] = useState({}); // State to track quantities
  const { handleAddToCart } = useOutletContext(); // Access handleAddToCart from context

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // Initialize quantities for each product
        const initialQuantities = data.reduce((acc, product) => {
          acc[product.id] = 0;
          return acc;
        }, {});
        setProductQuantities(initialQuantities);
      })
      .catch((error) => console.log('Error fetching products', error));
  }, [categoryName]);

  const increment = (id) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const decrement = (id) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 0) - 1, 0),
    }));
  };

  const handleAddToCartClick = (product) => {
    console.log(product);
    handleAddToCart(product.id, product.price, productQuantities[product.id]);
  };

  return (
    <div>
      <h2>Products in {categoryName}</h2>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => decrement(product.id)}>-</button>
            <span>{productQuantities[product.id] || 0}</span>
            <button onClick={() => increment(product.id)}>+</button>
            <button onClick={() => handleAddToCartClick(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
