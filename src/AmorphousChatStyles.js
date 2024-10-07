// AmorphousChatStyles.js
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

export const morph = keyframes`
  0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25% { border-radius: 50% 50% 60% 40% / 50% 40% 60% 50%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  75% { border-radius: 40% 70% 50% 60% / 60% 50% 40% 70%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
`;

export const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

export const ChatButton = styled(motion.div)`
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

export const PulsingCircle = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const SizeToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

export const ChatInterface = styled(motion.div)`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: ${props => props.$isExpanded ? '400px' : '300px'};
  height: ${props => props.$isExpanded ? '600px' : '400px'};
  max-width: 90vw;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s, height 0.3s;
`;

export const ChatHeader = styled.div`
  background-color: #007bff;
  color: #ffffff;
  padding: 10px 15px;
  font-weight: bold;
  position: relative;
`;

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #e6e6e6;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #e6e6e6;
  border-radius: 20px;
  margin-right: 10px;
`;

export const SendButton = styled.button`
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

export const TextBubble = styled(motion.div)`
  position: absolute;
  left: -220px;
  top: -50%;
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

export const HideButton = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  cursor: pointer;
`;

export const UserMessage = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  margin-bottom: 10px;
  word-wrap: break-word;
  align-self: flex-end;
  background-color: #0084ff;
  color: white;
`;

export const AIMessage = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  margin-bottom: 10px;
  word-wrap: break-word;
  align-self: flex-start;
  background-color: #f0f0f0;
  color: black;
`;

export const SearchResultContainer = styled.div`
  margin-top: 10px;
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
`;

export const SearchResultItem = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

export const SearchResultImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

export const SearchResultDetails = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 5px 0;
    font-size: 14px;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: #666;
  }
`;