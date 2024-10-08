import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { Maximize2, Minimize2 } from 'lucide-react';
import {
  ChatButton,
  PulsingCircle,
  ChatInterface,
  ChatHeader,
  ChatMessages,
  ChatInputContainer,
  ChatInput,
  SendButton,
  TextBubble,
  HideButton,
  UserMessage,
  AIMessage,
  SearchResultContainer,
  SearchResultItem,
  SearchResultImage,
  SearchResultDetails,
  SizeToggleButton,
} from "./AmorphousChatStyles";

const popupMessages = [
  "Looking for assistance? I'm here to help!",
  "Have a question? Just ask me!",
  "Sia-ren AI at your service!",
];

const greetingMessages = [
  "Hi! What brings you here today?",
  "Hello! I'm Sen Rai AI, your friendly AI.",
  "Hi there! How can I assist you today?",
];

const AmorphousChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const popupRef = useRef(null);
  const popupTimerRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const popupIntervalRef = useRef(null);

  const toggleChat = () => {
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
        clearInterval(popupIntervalRef.current);
      } else {
        startPopupInterval();
      }
      return !prevIsOpen;
    });
  };

  const toggleSize = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  const handleInputChange = (event) => setUserMessage(event.target.value);

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }

    if (userMessage.trim() !== "") {
      const newUserMessage = { text: userMessage, sender: "user", userId };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setUserMessage("");

      const loadingMessage = {
        text: "thinking...",
        sender: "ai",
        isLoading: true,
      };
      setMessages((prevMessages) => [...prevMessages, loadingMessage]);

      try {
        const response = await fetch("https://sai-ren-ai-backend.onrender.com/ai-agent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: newUserMessage.text,
            userId,
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

  const showPopupMessage = (message) => {
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

  const hidePopup = () => {
    setShowPopup(false);
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
    }
  };

  const startPopupInterval = () => {
    if (popupIntervalRef.current) {
      clearInterval(popupIntervalRef.current);
    }

    popupIntervalRef.current = setInterval(() => {
      if (!isOpen && !showPopup) {
        const randomMessage =
          popupMessages[Math.floor(Math.random() * popupMessages.length)];
        showPopupMessage(randomMessage);
      }
    }, 30000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsUserInteracting(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    const initialMessage =
      popupMessages[Math.floor(Math.random() * popupMessages.length)];
    showPopupMessage(initialMessage);

    startPopupInterval();

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
          $isExpanded={isExpanded}
        >
          <ChatHeader>
            Sia-ren AI
            <SizeToggleButton onClick={toggleSize}>
              {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </SizeToggleButton>
          </ChatHeader>
          <ChatMessages ref={chatMessagesRef}>
            {messages.map((msg, index) =>
              msg.sender === "user" ? (
                <UserMessage key={index}>{msg.text}</UserMessage>
              ) : (
                <AIMessage key={index}>
                  {msg.text}
                  {msg.searchResults && (
                    <SearchResultContainer>
                      {msg.searchResults.map((result, resultIndex) => (
                        <SearchResultItem key={resultIndex}>
                          <SearchResultImage src={result.images[0]} alt={result.title} />
                          <SearchResultDetails>
                            <h4>{result.title}</h4>
                            <p>Price: ${result.price}</p>
                            <p>Rating: {result.rating}/5</p>
                          </SearchResultDetails>
                        </SearchResultItem>
                      ))}
                    </SearchResultContainer>
                  )}
                </AIMessage>
              )
            )}
          </ChatMessages>
          <ChatInputContainer>
            <ChatInput
              type="text"
              placeholder="Type a message..."
              value={userMessage}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <SendButton onClick={handleSendMessage}>→</SendButton>
          </ChatInputContainer>
        </ChatInterface>
      )}
    </motion.div>
  );
};

export default AmorphousChat;