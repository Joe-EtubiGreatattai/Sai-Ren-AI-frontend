import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import {
  AuthForm,
  AuthInput,
  AuthButton,
  AuthLink,
} from "./AmorphousChatStyles";
import { FaShoppingCart, FaHeart, FaUser, FaGift } from "react-icons/fa"; // Importing icons
import "./style.css";

const API_URL = "http://localhost:5000/auth";

const AuthFormComponent = ({ setIsLoggedIn, setIsOpen, handleSuccessfulAuth }) => {
  const [authMode, setAuthMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [serviceType, setServiceType] = useState("customer support"); // Default service type
  const [error, setError] = useState("");
  const [preferences, setPreferences] = useState([]); // To manage selected preferences

  const availablePreferences = [
    { id: 1, icon: <FaShoppingCart />, label: "Shopping" },
    { id: 2, icon: <FaHeart />, label: "Favorites" },
    { id: 3, icon: <FaUser />, label: "Account" },
    { id: 4, icon: <FaGift />, label: "Gifts" },
  ];

  const resetAuthForm = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setPreferences([]);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      if (response.data && response.data.token) {
        Cookies.set('authToken', response.data.token, { expires: 1 });
        await handleSuccessfulAuth(); // Call the wrapper function that handles auth and fetches user info
        resetAuthForm();
  
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        username,
        password,
        preferences,
        service_type: serviceType,
      });
      if (response.data && response.data.token) {
        Cookies.set('authToken', response.data.token, { expires: 1 });
        await handleSuccessfulAuth(); // Call the wrapper function that handles auth and fetches user info
        resetAuthForm();
      
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError("Password reset link sent to your email");
    setTimeout(() => {
      setAuthMode("login");
      setError("");
    }, 3000);
  };

  const togglePreference = (preference) => {
    setPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((p) => p !== preference)
        : [...prev, preference]
    );
  };

  const renderPreferences = () => (
    <div className="preference-grid">
      <p style={{ fontSize: "12px", marginBottom: "10px" }}>
        Please choose your preferences:
      </p>
      <div className="grid-container">
        {availablePreferences.map((pref) => (
          <div
            key={pref.id}
            className={`preference-item ${preferences.includes(pref.label) ? "selected" : ""}`}
            onClick={() => togglePreference(pref.label)}
          >
            {pref.icon}
            <span style={{ fontSize: "12px" }}>{pref.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServiceTypeDropdown = () => (
    <div>
      <label htmlFor="serviceType" style={{ fontSize: "12px" }}>Select Service Type:</label>
      <select
        id="serviceType"
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        style={{ margin: "10px 0", padding: "8px", fontSize: "12px", width: "100%" }}
      >
        <option value="customer support">Customer Support</option>
        <option value="ecommerce">E-commerce</option>
        <option value="appointmentbooking">Appointment Booking</option>
      </select>
    </div>
  );

  const renderForm = () => {
    switch (authMode) {
      case "signup":
        return (
          <AuthForm onSubmit={handleSignup}>
            {error && <p>{error}</p>}
            <AuthInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <AuthInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AuthInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <AuthInput
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {renderPreferences()}
            {renderServiceTypeDropdown()}
            <AuthButton type="submit">Sign Up</AuthButton>
            <AuthLink onClick={() => setAuthMode("login")}>
              Already have an account? Log In
            </AuthLink>
          </AuthForm>
        );
      case "forgot":
        return (
          <AuthForm onSubmit={handleForgotPassword}>
            {error && <p>{error}</p>}
            <AuthInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AuthButton type="submit">Reset Password</AuthButton>
            <AuthLink onClick={() => setAuthMode("login")}>
              Back to Login
            </AuthLink>
          </AuthForm>
        );
      default: // "login" mode
        return (
          <AuthForm onSubmit={handleLogin}>
            {error && <p>{error}</p>}
            <AuthInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <AuthInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <AuthButton type="submit">Log In</AuthButton>
            <AuthLink onClick={() => setAuthMode("signup")}>
              Don't have an account? Sign Up
            </AuthLink>
            <AuthLink onClick={() => setAuthMode("forgot")}>
              Forgot Password?
            </AuthLink>
          </AuthForm>
        );
    }
  };

  return <>{renderForm()}</>;
};

export default AuthFormComponent;
