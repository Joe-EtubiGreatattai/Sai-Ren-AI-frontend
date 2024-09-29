import React from "react";
import "./Store.css"; // Create a separate CSS file for store styling
import sneakerImage from "../assets/sneaker.jpg";
import casualShoesImage from "../assets/casual-shoes.jpg";
import formalShoesImage from "../assets/formal-shoes.webp";
import sportsShoesImage from "../assets/sports-shoes.jpeg";
import bootsImage from "../assets/boots.jpeg";

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    image: sneakerImage,
    description:
      "Experience unparalleled comfort and style with the Nike Air Max.",
    price: "$120",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    image: casualShoesImage,
    description:
      "Run the extra mile with the responsive cushioning of Adidas Ultraboost.",
    price: "$150",
  },
  {
    id: 3,
    name: "Puma Suede Classic",
    image: formalShoesImage,
    description:
      "A timeless classic that goes with any outfit - the Puma Suede Classic.",
    price: "$90",
  },
  {
    id: 4,
    name: "Reebok Classic Leather",
    image: sportsShoesImage,
    description:
      "Elevate your style with the iconic Reebok Classic Leather shoes.",
    price: "$110",
  },
  {
    id: 5,
    name: "Timberland Boots",
    image: bootsImage,
    description:
      "Rugged and ready for any adventure - Timberland boots are a must-have.",
    price: "$160",
  },
  {
    id: 6,
    name: "Reebok Classic Leather",
    image: sportsShoesImage,
    description:
      "Elevate your style with the iconic Reebok Classic Leather shoes.",
    price: "$110",
  },
  {
    id: 7,
    name: "Timberland Boots",
    image: bootsImage,
    description:
      "Rugged and ready for any adventure - Timberland boots are a must-have.",
    price: "$160",
  },
  {
    id: 8,
    name: "Reebok Classic Leather",
    image: sportsShoesImage,
    description:
      "Elevate your style with the iconic Reebok Classic Leather shoes.",
    price: "$110",
  },
  {
    id: 9,
    name: "Timberland Boots",
    image: bootsImage,
    description:
      "Rugged and ready for any adventure - Timberland boots are a must-have.",
    price: "$160",
  },
  {
    id: 10,
    name: "Reebok Classic Leather",
    image: sportsShoesImage,
    description:
      "Elevate your style with the iconic Reebok Classic Leather shoes.",
    price: "$110",
  },
  {
    id: 11,
    name: "Timberland Boots",
    image: bootsImage,
    description:
      "Rugged and ready for any adventure - Timberland boots are a must-have.",
    price: "$160",
  },
];

const Store = () => {
  return (
    <div className="store">
      <h2 className="store-title">Our Collection</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
