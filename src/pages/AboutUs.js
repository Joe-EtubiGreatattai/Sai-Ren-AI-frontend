import React from 'react';
import './AboutUs.css'; // Create a separate CSS file for about us styling
import teamImage from '../assets/team.png'; // Replace with an actual image path
import historyImage from '../assets/history.png'; // Replace with an actual image path
import valuesImage from '../assets/values.jpg'; // Replace with an actual image path

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="mission">
        <h3>Our Mission</h3>
        <p>
          At Ludin Store, our mission is to provide high-quality footwear that combines comfort, style, and durability.
          We believe that the right pair of shoes can transform not just your look but your confidence and lifestyle.
        </p>
      </section>

      <section className="history">
        <h3>Our History</h3>
        <img src={historyImage} alt="Our History" className="about-image" />
        <p>
          Founded in 2010, Ludin Store started as a small family-owned business with a vision to redefine how people 
          shop for shoes. Over the years, we have grown into a reputable store, known for our diverse collection and 
          exceptional customer service.
        </p>
      </section>

      <section className="values">
        <h3>Our Values</h3>
        <img src={valuesImage} alt="Our Values" className="about-image" />
        <p>
          We are committed to:
        </p>
        <ul>
          <li>Quality: We ensure every shoe meets our high standards.</li>
          <li>Customer Satisfaction: Your happiness is our priority.</li>
          <li>Sustainability: We strive to use eco-friendly materials and practices.</li>
          <li>Community: We give back to the communities we serve.</li>
        </ul>
      </section>

      <section className="team">
        <h3>Meet Our Team</h3>
        <img src={teamImage} alt="Our Team" className="about-image" />
        <p>
          Our team consists of passionate footwear enthusiasts who are dedicated to helping you find the perfect pair of shoes.
          From our expert stylists to our customer service representatives, we are here to make your shopping experience enjoyable.
        </p>
      </section>

      <section className="commitment">
        <h3>Our Commitment to You</h3>
        <p>
          We are dedicated to providing an excellent shopping experience, whether online or in-store. Our knowledgeable staff 
          is always available to assist you in finding the right shoes for any occasion. Your satisfaction is our success, and we 
          constantly strive to exceed your expectations.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
