import React, { useState, useEffect } from "react";
import "./Store.css";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="store">
      <h2 className="store-title">Our Collection</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.images[0]}
              alt={product.title}
              className="product-image"
            />
            <h3 className="product-name">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
