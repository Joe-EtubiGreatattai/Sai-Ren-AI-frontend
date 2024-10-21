import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogOut } from "lucide-react";
import Cookies from "js-cookie";

// Import components
import TextBubble from "./TextBubble";
import ChatHeader from "./ChatHeader";
import CartComponent from "./CartComponent";
import AppointmentComponent from "./AppointmentComponent";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import AuthFormComponent from "./AuthFormComponent";

// Import styles
import {
  ChatButton,
  PulsingCircle,
  ChatInterface,
  JumpToBottomButton,
  LogoutButton,
} from "./AmorphousChatStyles";

// Import constants and utility functions
import { popupMessages, greetingMessages } from "./constant";
import {
  fetchUserInfo,
  handleSuccessfulAuth,
  handleLogout,
  toggleChat,
  handleSendMessage,
  showPopupMessage,
  hidePopup,
  startPopupInterval,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  calculateTotal,
  handleCheckout,
  handleScroll,
  jumpToBottom,
} from "./functions";

const AmorphousChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [cart, setCart] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPendingAppointment, setShowPendingAppointment] = useState(false);
  const [lastCartReminder, setLastCartReminder] = useState(null);
  const [chatHeaderText, setChatHeaderText] = useState("Sia-ren");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [showJumpToBottom, setShowJumpToBottom] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [suggestedAppointment, setSuggestedAppointment] = useState(null);

  const popupRef = useRef(null);
  const popupTimerRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const popupIntervalRef = useRef(null);

  const fetchUserInfoWrapper = async () => {
    const user = await fetchUserInfo();
    if (user) {
      setServiceType(user.service_type);
      setUserInfo(user);
      setChatHeaderText(`Hi, ${user.username.slice(0, 6)}...`);
    } else {
      setChatHeaderText("Welcome!");
    }
  };


  const handleSuccessfulAuthWrapper = async () => {
    await handleSuccessfulAuth(setIsLoggedIn);
    setIsOpen(true);
    await fetchUserInfoWrapper();
    window.location.reload();
  };
  const toggleChatWrapper = () => {
    toggleChat(
      setIsOpen,
      messages,
      setMessages,
      setShowPopup,
      () => clearInterval(popupIntervalRef.current),
      startPopupIntervalWrapper,
      greetingMessages
    );
  };

  const handleSendMessageWrapper = async () => {
    await handleSendMessage(
      userMessage,
      setMessages,
      setUserMessage,
      showPopupMessageWrapper,
      serviceType,
      setSuggestedAppointment,
      setShowPendingAppointment
    );
  };

  const showPopupMessageWrapper = (message) => {
    showPopupMessage(message, setPopupMessage, setShowPopup, popupTimerRef);
  };

  const hidePopupWrapper = () => {
    hidePopup(setShowPopup, popupTimerRef);
  };

  const startPopupIntervalWrapper = () => {
    startPopupInterval(
      isOpen,
      showPopup,
      cart,
      lastCartReminder,
      showPopupMessageWrapper,
      setLastCartReminder,
      popupMessages,
      popupIntervalRef
    );
  };

  const addToCartWrapper = (item) => {
    addToCart(item, setCart);
  };

  const removeFromCartWrapper = (itemId) => {
    removeFromCart(itemId, setCart);
  };

  const updateCartItemQuantityWrapper = (itemId, newQuantity) => {
    updateCartItemQuantity(itemId, newQuantity, setCart);
  };

  const handleCheckoutWrapper = () => {
    handleCheckout(cart, setCart, setShowCart);
  };

  const handleScrollWrapper = () => {
    handleScroll(chatMessagesRef, setShowJumpToBottom);
  };

  const jumpToBottomWrapper = () => {
    jumpToBottom(chatMessagesRef);
  };

  const handleLogoutWrapper = () => {
    handleLogout(
      setIsLoggedIn,
      setIsOpen,
      setUserInfo,
      setChatHeaderText,
      setMessages,
      setCart,
      setPendingAppointments
    );
  };

  const confirmAppointment = () => {
    if (suggestedAppointment) {
      setPendingAppointments([...pendingAppointments, suggestedAppointment]);
      setSuggestedAppointment(null);
      setShowPendingAppointment(false);
      showPopupMessageWrapper("Appointment confirmed!");
    }
  };

  const rejectAppointment = () => {
    setSuggestedAppointment(null);
    setShowPendingAppointment(false);
    showPopupMessageWrapper("Appointment rejected. Please try booking again.");
  };

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setIsLoggedIn(true);
      fetchUserInfoWrapper();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsUserInteracting(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    const initialMessage =
      popupMessages[Math.floor(Math.random() * popupMessages.length)];
    showPopupMessageWrapper(initialMessage);

    startPopupIntervalWrapper();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
      if (popupIntervalRef.current) {
        clearInterval(popupIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    jumpToBottomWrapper();
  }, [messages]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.addEventListener("scroll", handleScrollWrapper);
    }
    return () => {
      if (chatMessagesRef.current) {
        chatMessagesRef.current.removeEventListener(
          "scroll",
          handleScrollWrapper
        );
      }
    };
  }, []);

  return (
    <motion.div style={{ position: "fixed", right: "10px", bottom: "20px" }}>
      <AnimatePresence>
        {showPopup && !isOpen && (
          <TextBubble
            popupMessage={popupMessage}
            hidePopup={hidePopupWrapper}
            setIsUserInteracting={setIsUserInteracting}
          />
        )}
      </AnimatePresence>

      <ChatButton
        onClick={isLoggedIn ? toggleChatWrapper : () => setIsOpen(true)}
      >
        <PulsingCircle />
      </ChatButton>

      {isOpen && (
        <ChatInterface
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          $isExpanded={isExpanded}
        >
          {isLoggedIn && (
            <LogoutButton onClick={handleLogoutWrapper}>
              <LogOut size={24} />
            </LogoutButton>
          )}
          <ChatHeader
            isLoggedIn={isLoggedIn}
            chatHeaderText={chatHeaderText}
            authMode={authMode}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            userInfo={userInfo}
            showCart={showCart}
            setShowCart={setShowCart}
            cart={cart}
            showPendingAppointment={showPendingAppointment}
            setShowPendingAppointment={setShowPendingAppointment}
            pendingAppointments={pendingAppointments}
          />

          {!isLoggedIn ? (
            <AuthFormComponent
              setIsLoggedIn={setIsLoggedIn}
              setIsOpen={setIsOpen}
              authMode={authMode}
              setAuthMode={setAuthMode}
              handleSuccessfulAuth={handleSuccessfulAuthWrapper}
            />
          ) : userInfo && userInfo.service_type === "ecommerce" && showCart ? (
            <CartComponent
              cart={cart}
              updateCartItemQuantity={updateCartItemQuantityWrapper}
              removeFromCart={removeFromCartWrapper}
              calculateTotal={calculateTotal}
              handleCheckout={handleCheckoutWrapper}
            />
          ) : userInfo &&
            userInfo.service_type === "appointmentbooking" &&
            showPendingAppointment ? (
            <>
              {suggestedAppointment ? (
                <AppointmentComponent
                  pendingAppointments={[suggestedAppointment]}
                  isSuggestion={true}
                  onConfirm={confirmAppointment}
                  onReject={rejectAppointment}
                />
              ) : (
                <AppointmentComponent
                  pendingAppointments={pendingAppointments}
                  isSuggestion={false}
                />
              )}
            </>
          ) : (
            <>
              <ChatMessages
                messages={messages}
                userInfo={userInfo}
                addToCart={addToCartWrapper}
                chatMessagesRef={chatMessagesRef}
              />

              {showJumpToBottom && (
                <JumpToBottomButton onClick={jumpToBottomWrapper}>
                  <ChevronDown size={24} />
                </JumpToBottomButton>
              )}

              <ChatInput
                userMessage={userMessage}
                setUserMessage={setUserMessage}
                handleSendMessage={handleSendMessageWrapper}
              />
            </>
          )}
        </ChatInterface>
      )}
    </motion.div>
  );
};

export default AmorphousChat;
