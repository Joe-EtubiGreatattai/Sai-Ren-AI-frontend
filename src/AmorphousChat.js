import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const morph = keyframes`
  0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25% { border-radius: 50% 50% 60% 40% / 50% 40% 60% 50%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  75% { border-radius: 40% 70% 50% 60% / 60% 50% 40% 70%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const ChatButton = styled(motion.div)`
  width: 60px;
  height: 60px;
  background: #0084ff;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${morph} 8s ease-in-out infinite;
  cursor: pointer;
  z-index: 1000;
`;

const PulsingCircle = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const ChatInterface = styled(motion.div)`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 300px;
  height: 400px;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: #0084ff;
  color: white;
  padding: 10px;
  font-weight: bold;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #e6e6e6;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #e6e6e6;
  border-radius: 20px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  background: #0084ff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextBubble = styled(motion.div)`
  position: absolute;
  left: -220px;
  top: 0;
  background: #f0f0f0;
  padding: 10px 15px;
  border-radius: 18px;
  min-width: 100px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &::after {
    content: "";
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    border-left: 10px solid #f0f0f0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
`;

const HideButton = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  cursor: pointer;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  margin-bottom: 10px;
  word-wrap: break-word;
`;

const UserMessage = styled(MessageBubble)`
  align-self: flex-end;
  background-color: #0084ff;
  color: white;
`;

const AIMessage = styled(MessageBubble)`
  align-self: flex-start;
  background-color: #f0f0f0;
  color: black;
`;

const popupMessages = [
  "Hi there! I'm your friendly Sai Ren AI.",
  "Looking for assistance? I'm here to help!",
  "Have a question? Just ask me!",
  "Sai Ren AI at your service!",
  "What can I do for you today?",
];

const AmorphousChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [pageContent, setPageContent] = useState("");
  const [hasFetchedUrl, setHasFetchedUrl] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const popupRef = useRef(null);
  const popupTimerRef = useRef(null);
  const chatMessagesRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowPopup(false);
    }
  };

  const handleInputChange = (event) => setUserMessage(event.target.value);

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  const fetchPageUrl = async () => {
    const currentUrl = window.location.href;
    console.log("Current URL:", currentUrl);
  
    try {
      const response = await fetch("http://localhost:5000/extract-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: currentUrl,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Full API Response:", data);
  
      setPageContent(data.extractedText || "No text extracted from the page.");
      setMessages([{ text: data.aiSuggestions, sender: "ai" }]);
      showPopupMessage(data.aiSuggestions);
    } catch (error) {
      console.error("Error sending URL to backend:", error);
      setPageContent(`Error fetching data: ${error.message}`);
  
      const randomGreeting = popupMessages[Math.floor(Math.random() * popupMessages.length)];
      setMessages([{ text: randomGreeting, sender: "ai" }]);
      showPopupMessage(randomGreeting);
    }
  };

  const handleSendMessage = async () => {
    if (userMessage.trim() !== "") {
      const newUserMessage = { text: userMessage, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setUserMessage("");
      
      // Add a loading message
      const loadingMessage = { text: "thinking. . .", sender: "ai", isLoading: true };
      setMessages((prevMessages) => [...prevMessages, loadingMessage]);
  
      try {
        const response = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: newUserMessage.text,
            pageContent: pageContent,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        const aiMessage = { text: data.reply, sender: "ai" };
  
        // Remove loading message and add AI response
        setMessages((prevMessages) => 
          prevMessages
            .filter(msg => !msg.isLoading)
            .concat(aiMessage)
        );
  
        showPopupMessage(aiMessage.text);
      } catch (error) {
        console.error("Error sending message to backend:", error);
        const errorMessage = {
          text: "Sorry, I couldn't process your request. Please try again.",
          sender: "ai",
          isError: true
        };
  
        // Remove loading message and add error message
        setMessages((prevMessages) => 
          prevMessages
            .filter(msg => !msg.isLoading)
            .concat(errorMessage)
        );
  
        showPopupMessage(errorMessage.text);
      }
    }
  };

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
    }
    
    popupTimerRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 25000);
  };

  const hidePopup = () => {
    setShowPopup(false);
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
    }
  };

  useEffect(() => {
    if (!hasFetchedUrl) {
      fetchPageUrl();
      setHasFetchedUrl(true);
    }

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsUserInteracting(false);
      }
    };

    const handleClick = (event) => {
      console.log('Click event:', {
        target: event.target.tagName,
        id: event.target.id,
        className: event.target.className,
        text: event.target.textContent
      });
    };

    const handlePageLoad = () => {
      console.log('Page loaded:', window.location.href);
    };

    const handlePageNavigation = () => {
      console.log('Page navigated:', window.location.href);
    };

    const handleInputChange = (event) => {
      console.log('Input changed:', {
        target: event.target.tagName,
        id: event.target.id,
        value: event.target.value
      });
    };

    const handleScroll = () => {
      console.log('Page scrolled:', {
        scrollX: window.scrollX,
        scrollY: window.scrollY
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("click", handleClick);
    window.addEventListener("load", handlePageLoad);
    window.addEventListener("popstate", handlePageNavigation);
    document.addEventListener("input", handleInputChange);
    window.addEventListener("scroll", handleScroll);

    console.log('Component mounted, current URL:', window.location.href);

    const originalConsoleLog = console.log;
    console.log = (...args) => {
      originalConsoleLog.apply(console, args);
      // You can send this log to your backend or process it as needed
      // For example: sendLogToBackend(args);
    };

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("load", handlePageLoad);
      window.removeEventListener("popstate", handlePageNavigation);
      document.removeEventListener("input", handleInputChange);
      window.removeEventListener("scroll", handleScroll);
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
      console.log = originalConsoleLog;
    };
  }, [hasFetchedUrl]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      style={{ position: "fixed", right: "20px", bottom: "20px" }}
    >
      <AnimatePresence>
        {showPopup && !isOpen && (
          <TextBubble
            ref={popupRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setIsUserInteracting(true)}
            onMouseLeave={() => setIsUserInteracting(false)}
          >
            <HideButton onClick={hidePopup} />
            {popupMessage}
          </TextBubble>
        )}
      </AnimatePresence>

      <ChatButton onClick={toggleChat}>
        <PulsingCircle />
      </ChatButton>

      {isOpen && (
        <ChatInterface
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <ChatHeader>Sai Ren AI</ChatHeader>
          <ChatMessages ref={chatMessagesRef}>
            {messages.map((msg, index) => (
              msg.sender === "user" ? (
                <UserMessage key={index}>{msg.text}</UserMessage>
              ) : (
                <AIMessage key={index}>{msg.text}</AIMessage>
              )
            ))}
          </ChatMessages>
          <ChatInputContainer>
            <ChatInput
              type="text"
              placeholder="Type a message..."
              value={userMessage}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <SendButton onClick={handleSendMessage}>→</SendButton>
          </ChatInputContainer>
        </ChatInterface>
      )}
    </motion.div>
  );
};

export default AmorphousChat;