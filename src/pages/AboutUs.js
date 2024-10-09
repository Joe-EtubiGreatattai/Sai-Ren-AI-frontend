import React, { useState } from 'react';
import './AboutUs.css';
import teamImage from '../assets/team.png';
import historyImage from '../assets/history.png';
import valuesImage from '../assets/values.jpg';
import processImage from '../assets/process.png';
import sustainabilityImage from '../assets/sustainability.jpeg';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqData = [
    {
      question: "What types of shoes do you offer?",
      answer: "We offer a wide range of footwear including casual, formal, athletic, and specialty shoes for men, women, and children."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unworn shoes in their original packaging. Please check our Returns page for more details."
    },
    {
      question: "Do you have physical stores?",
      answer: "Yes, we have stores in major cities across the country. You can find our store locations on our Contact page."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email. You can use this to track your package on our website."
    }
  ];

  const toggleFAQ = (index) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(index);
    }
  };

  return (
    <div className="about-us">
      <h1 className="about-title">About Ludin Store</h1>
      
      <nav className="about-nav">
        <button onClick={() => setActiveTab('mission')} className={activeTab === 'mission' ? 'active' : ''}>Mission</button>
        <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>History</button>
        <button onClick={() => setActiveTab('values')} className={activeTab === 'values' ? 'active' : ''}>Values</button>
        <button onClick={() => setActiveTab('team')} className={activeTab === 'team' ? 'active' : ''}>Team</button>
        <button onClick={() => setActiveTab('process')} className={activeTab === 'process' ? 'active' : ''}>Our Process</button>
        <button onClick={() => setActiveTab('sustainability')} className={activeTab === 'sustainability' ? 'active' : ''}>Sustainability</button>
        <button onClick={() => setActiveTab('faq')} className={activeTab === 'faq' ? 'active' : ''}>FAQ</button>
      </nav>

      {activeTab === 'mission' && (
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            At Ludin Store, our mission is to provide high-quality footwear that combines comfort, style, and durability.
            We believe that the right pair of shoes can transform not just your look but your confidence and lifestyle.
            Our goal is to empower individuals to step confidently into every aspect of their lives, whether it's a casual
            day out, an important business meeting, or an adventure in the great outdoors.
          </p>
        </section>
      )}

      {activeTab === 'history' && (
        <section className="history">
          <h2>Our History</h2>
          <img src={historyImage} alt="Our History" className="about-image" />
          <p>
            Founded in 2010 by shoe enthusiasts John and Sarah Ludin, Ludin Store started as a small family-owned business
            with a vision to redefine how people shop for shoes. What began as a modest storefront in downtown has now grown
            into a nationwide chain with a robust online presence. Over the years, we've expanded our collection, embraced
            innovative technologies, and built lasting relationships with both customers and suppliers. Our journey has been
            marked by a commitment to quality, customer satisfaction, and continuous improvement.
          </p>
        </section>
      )}

      {activeTab === 'values' && (
        <section className="values">
          <h2>Our Values</h2>
          <img src={valuesImage} alt="Our Values" className="about-image" />
          <p>
            At Ludin Store, our values form the foundation of everything we do. We are committed to:
          </p>
          <ul>
            <li><strong>Quality:</strong> We ensure every shoe meets our high standards of craftsmanship and durability.</li>
            <li><strong>Customer Satisfaction:</strong> Your happiness is our priority. We strive to exceed your expectations in every interaction.</li>
            <li><strong>Sustainability:</strong> We're dedicated to reducing our environmental impact through eco-friendly materials and practices.</li>
            <li><strong>Innovation:</strong> We continuously seek new ways to improve our products and services.</li>
            <li><strong>Integrity:</strong> We conduct our business with honesty, transparency, and ethical practices.</li>
            <li><strong>Community:</strong> We actively give back to the communities we serve through various initiatives and partnerships.</li>
          </ul>
        </section>
      )}

      {activeTab === 'team' && (
        <section className="team">
          <h2>Meet Our Team</h2>
          <img src={teamImage} alt="Our Team" className="about-image" />
          <p>
            Our team consists of passionate footwear enthusiasts who are dedicated to helping you find the perfect pair of shoes.
            From our expert stylists to our customer service representatives, we are here to make your shopping experience enjoyable.
            Our diverse team brings together a wealth of experience in fashion, retail, and customer service. We regularly participate
            in training programs to stay updated on the latest trends and technologies in the footwear industry.
          </p>
        </section>
      )}

      {activeTab === 'process' && (
        <section className="process">
          <h2>Our Process</h2>
          <img src={processImage} alt="Our Process" className="about-image" />
          <p>
            At Ludin Store, we take pride in our meticulous process of curating and delivering the best footwear to our customers:
          </p>
          <ol>
            <li><strong>Sourcing:</strong> We partner with reputable manufacturers who share our commitment to quality and ethical practices.</li>
            <li><strong>Quality Control:</strong> Every shoe undergoes rigorous testing to ensure it meets our high standards.</li>
            <li><strong>Curation:</strong> Our expert buyers carefully select styles that align with current trends and our customers' needs.</li>
            <li><strong>Presentation:</strong> We provide detailed product information and high-quality images to help you make informed decisions.</li>
            <li><strong>Customer Service:</strong> Our knowledgeable staff is always ready to assist you in finding the perfect fit.</li>
            <li><strong>Feedback Loop:</strong> We continuously gather and act on customer feedback to improve our offerings and services.</li>
          </ol>
        </section>
      )}

      {activeTab === 'sustainability' && (
        <section className="sustainability">
          <h2>Our Commitment to Sustainability</h2>
          <img src={sustainabilityImage} alt="Sustainability" className="about-image" />
          <p>
            At Ludin Store, we recognize our responsibility to the environment and are committed to sustainable practices:
          </p>
          <ul>
            <li><strong>Eco-friendly Materials:</strong> We prioritize shoes made from sustainable and recycled materials.</li>
            <li><strong>Responsible Packaging:</strong> Our packaging is made from recycled materials and is fully recyclable.</li>
            <li><strong>Energy Efficiency:</strong> We're transitioning our stores and warehouses to renewable energy sources.</li>
            <li><strong>Waste Reduction:</strong> We have implemented a comprehensive recycling program across all our operations.</li>
            <li><strong>Sustainable Partnerships:</strong> We collaborate with brands and suppliers who share our commitment to sustainability.</li>
            <li><strong>Community Initiatives:</strong> We organize and participate in local environmental conservation efforts.</li>
          </ul>
        </section>
      )}

      {activeTab === 'faq' && (
        <section className="faq">
          <h2>Frequently Asked Questions</h2>
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <h3 onClick={() => toggleFAQ(index)} className="faq-question">
                {item.question}
                <span className={`faq-toggle ${expandedFAQ === index ? 'open' : ''}`}></span>
              </h3>
              {expandedFAQ === index && <p className="faq-answer">{item.answer}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default AboutUs;