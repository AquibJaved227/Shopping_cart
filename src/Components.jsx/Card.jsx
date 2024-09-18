import React from 'react';

const Card = ({ title, imageUrl, onViewProducts }) => {
  return (
    <div className="category-card">
      <img src={imageUrl} alt={title} className="category-image" />
      <h3>{title}</h3>
      <button onClick={() => { console.log("Button clicked"); onViewProducts(); }}>
       View Products
      </button>
    </div>
  );
};

export default Card;
