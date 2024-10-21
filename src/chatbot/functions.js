import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchUserInfo = async () => {
  const token = Cookies.get("authToken");
  
  if (!token) {
    console.error("No auth token found");
    return null;
  }

  try {
    const response = await axios.get("https://sai-ren-ai-backend.onrender.com/auth/user-info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    console.log("Error details:", error.response ? error.response.data : "No response data");
    return null;
  }
};

export const handleSuccessfulAuth = (setIsLoggedIn, setIsOpen, fetchUserInfo) => {
  setIsLoggedIn(true);
  setIsOpen(true);
  fetchUserInfo();
};


export const handleLogout = (setIsLoggedIn, setIsOpen, setUserInfo, setChatHeaderText, setMessages, setCart, setPendingAppointments) => {
  setIsLoggedIn(false);
  setIsOpen(false);
  setUserInfo(null);
  setChatHeaderText("Sia-ren");
  Cookies.remove("authToken");
  setMessages([]);
  setCart([]);
  setPendingAppointments([]);
};

export const toggleChat = (setIsOpen, messages, setMessages, setShowPopup, clearInterval, startPopupInterval, greetingMessages) => {
  setIsOpen((prevIsOpen) => {
    if (!prevIsOpen) {
      if (messages.length === 0) {
        const greetingMessage =
          greetingMessages[
            Math.floor(Math.random() * greetingMessages.length)
          ];
        setMessages([{ text: greetingMessage, sender: "ai" }]);
      }
      setShowPopup(false);
      clearInterval();
    } else {
      startPopupInterval();
    }
    return !prevIsOpen;
  });
};

export const handleSendMessage = async (userMessage, setMessages, setUserMessage, showPopupMessage, serviceType, setSuggestedAppointment, setShowPendingAppointment) => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("userId", userId);
  }

  if (userMessage.trim() !== "") {
    const newUserMessage = {
      text: userMessage,
      sender: "user",
      userId,
      serviceType,
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserMessage("");

    const loadingMessage = {
      text: "thinking...",
      sender: "ai",
      isLoading: true,
    };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    try {
      const response = await fetch("http://localhost:5000/ai-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: newUserMessage.text,
          userId,
          serviceType,
          context: "",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      let aiMessage;
      if (data.results && data.results.length > 0) {
        aiMessage = {
          text: data.reply,
          sender: "ai",
          searchResults: data.results,
        };
      } else {
        aiMessage = { text: data.reply, sender: "ai" };
      }

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => !msg.isLoading).concat(aiMessage)
      );

      showPopupMessage(aiMessage.text);

      // Check if the response contains appointment information
      if (data.appointmentInfo) {
        setSuggestedAppointment(data.appointmentInfo);
        setShowPendingAppointment(true);
      }

    } catch (error) {
      console.error("Error sending message to backend:", error);
      const errorMessage = {
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: "ai",
        isError: true,
      };

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => !msg.isLoading).concat(errorMessage)
      );

      showPopupMessage(errorMessage.text);
    }
  }
};

export const showPopupMessage = (message, setPopupMessage, setShowPopup, popupTimerRef) => {
  const truncatedMessage =
    message.length > 100 ? `${message.substring(0, 100)}...` : message;
  setPopupMessage(truncatedMessage);
  setShowPopup(true);

  if (popupTimerRef.current) {
    clearTimeout(popupTimerRef.current);
  }

  popupTimerRef.current = setTimeout(() => {
    setShowPopup(false);
  }, 10000);
};

export const hidePopup = (setShowPopup, popupTimerRef) => {
  setShowPopup(false);
  if (popupTimerRef.current) {
    clearTimeout(popupTimerRef.current);
  }
};

export const startPopupInterval = (isOpen, showPopup, cart, lastCartReminder, showPopupMessage, setLastCartReminder, popupMessages, popupIntervalRef) => {
  if (popupIntervalRef.current) {
    clearInterval(popupIntervalRef.current);
  }

  popupIntervalRef.current = setInterval(() => {
    if (!isOpen && !showPopup) {
      if (
        cart.length > 0 &&
        (!lastCartReminder || Date.now() - lastCartReminder > 3600000)
      ) {
        showPopupMessage("Don't forget about the items in your cart!");
        setLastCartReminder(Date.now());
      } else {
        const randomMessage =
          popupMessages[Math.floor(Math.random() * popupMessages.length)];
        showPopupMessage(randomMessage);
      }
    }
  }, 30000);
};

export const addToCart = (item, setCart) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      return prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      return [...prevCart, { ...item, quantity: 1 }];
    }
  });
};

export const removeFromCart = (itemId, setCart) => {
  setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
};

export const updateCartItemQuantity = (itemId, newQuantity, setCart) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
  );
};

export const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const handleCheckout = (cart, setCart, setShowCart) => {
  console.log("Proceeding to checkout with items:", cart);
  setCart([]);
  setShowCart(false);
};

export const handleScroll = (chatMessagesRef, setShowJumpToBottom) => {
  if (chatMessagesRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = chatMessagesRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowJumpToBottom(!isNearBottom);
  }
};

export const jumpToBottom = (chatMessagesRef) => {
  if (chatMessagesRef.current) {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }
};