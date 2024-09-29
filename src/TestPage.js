import React from "react";
import AmorphousChat from "./AmorphousChat";

const TestPage = () => {
  return (
    <div className="font-sans p-5 max-w-3xl mx-auto">
      <nav className="mb-5">
        <button className="mr-2 px-3 py-1 border border-gray-300 rounded">
          Home
        </button>
        <button className="mr-2 px-3 py-1 border border-gray-300 rounded">
          Products
        </button>
        <button className="mr-2 px-3 py-1 border border-gray-300 rounded">
          About
        </button>
      </nav>

      <section className="mb-8">
        <h1 className="text-2xl font-bold mb-3">Welcome to Our Website</h1>
        <p>
          This is the home page of our website. We offer a wide range of
          products and services to meet your needs. Feel free to explore our
          site and don't hesitate to ask our AI assistant if you have any
          questions!
        </p>
      </section>

      <section className="mb-8">
        <h1 className="text-2xl font-bold mb-3">Our Products</h1>
        <p>
          Product A: Product A is our flagship item. It's known for its
          durability and efficiency.
          <br />
          Product B: Product B is perfect for those looking for a
          budget-friendly option without compromising on quality.
          <br />
          Product C: Product C is our latest innovation, combining cutting-edge
          technology with sleek design.
        </p>
      </section>

      <section className="mb-8">
        <h1 className="text-2xl font-bold mb-3">About Us</h1>
        <p>
          We are a company dedicated to providing high-quality products and
          exceptional customer service. Founded in 2010, we have grown from a
          small startup to a leader in our industry. Our mission is to
          continually innovate and improve the lives of our customers through
          our products and services.
        </p>
      </section>
      <AmorphousChat/>
    </div>
  );
};

export default TestPage;
