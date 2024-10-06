// src/pages/Home.js

import React from 'react';
import './Home.css'; // Import CSS for styling
import sneakerImage from '../assets/sneaker.jpg'; // Replace with your actual image paths
import casualShoesImage from '../assets/casual-shoes.jpg';
import formalShoesImage from '../assets/formal-shoes.webp';
import sportsShoesImage from '../assets/sports-shoes.jpeg';
import bootsImage from '../assets/boots.jpeg';

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to Ludin St!</h1>
        <p>Your one-stop shop for stylish and comfortable footwear.</p>
        <button className="shop-now">Shop Now</button>
      </header>

      <section className="featured">
        <h2>Featured Products</h2>
        <div className="featured-products">
          <div className="product">
            <img src={sneakerImage} alt="Sneakers" />
            <h3>Sneakers</h3>
            <p>Discover our latest collection of sneakers designed for both style and performance.</p>
          </div>
          <div className="product">
            <img src={casualShoesImage} alt="Casual Shoes" />
            <h3>Casual Shoes</h3>
            <p>Step out in comfort with our range of casual shoes for everyday wear.</p>
          </div>
          <div className="product">
            <img src={formalShoesImage} alt="Formal Shoes" />
            <h3>Formal Shoes</h3>
            <p>Elevate your look with our selection of formal shoes for any occasion.</p>
          </div>
          <div className="product">
            <img src={sportsShoesImage} alt="Sports Shoes" />
            <h3>Sports Shoes</h3>
            <p>Get the edge in your game with our performance-driven sports shoes.</p>
          </div>
         
        </div>
      </section>

      <section className="about-us">
        <h2>About Us</h2>
        <p>
          At Ludin Shoes, we are passionate about footwear. Our mission is to provide high-quality shoes 
          that combine comfort, style, and durability. Whether you're looking for casual wear, formal attire, 
          or athletic performance, we have the perfect pair for you.
        </p>
        <p>
          Our dedicated team of experts curates collections from top brands and ensures each shoe meets 
          our high standards. We believe in providing excellent customer service and a great shopping 
          experience.
        </p>
      </section>

      <section className="customer-reviews">
        <h2>What Our Customers Say</h2>
        <blockquote>
          <p>"I love Ludin Shoes! They have the best selection and the customer service is outstanding!"</p>
          <cite>- Sarah K.</cite>
        </blockquote>
        <blockquote>
          <p>"I found my favorite pair of sneakers here. The quality is top-notch!"</p>
          <cite>- Michael R.</cite>
        </blockquote>
      </section>

      <section className="latest-news">
        <h2>Latest News</h2>
        <p>
          We are excited to announce our new spring collection! 
          Visit our store or shop online to discover the latest styles and trends. 
          Don’t miss out on our exclusive discounts for new arrivals!
        </p>
      </section>

      <section className="contact-info">
        <h2>Contact Us</h2>
        <p>
          Have questions? We’re here to help! Contact us at:
        </p>
        <p>Email: info@ludinshoes.com</p>
        <p>Phone: (123) 456-7890</p>
      </section>
    </div>
  );
};

export default Home;
