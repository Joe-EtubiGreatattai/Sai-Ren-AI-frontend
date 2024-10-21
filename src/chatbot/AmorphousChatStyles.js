import styled, { keyframes, css } from "styled-components";
import { motion } from "framer-motion";

// Keyframe Animations
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

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Chat Button and Related Components
export const ChatButton = styled(motion.div)`
  width: 60px;
  height: 60px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${css`${morph}`} 8s ease-in-out infinite;
  cursor: pointer;
  z-index: 1000;
`;

export const PulsingCircle = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: ${css`${pulse}`} 2s ease-in-out infinite;
`;

// Chat Interface Components
export const ChatInterface = styled(motion.div)`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: ${(props) => (props.$isExpanded ? '400px' : '300px')};
  height: ${(props) => (props.$isExpanded ? '600px' : '400px')};
  max-width: 90vw;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
  transition: width 0.3s, height 0.3s;
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

// Chat Messages Area
export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

export const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #e6e6e6;
  background-color: #ffffff;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e6e6e6;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

export const SendButton = styled.button`
  background: #000;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
`;

// Message Bubbles
export const TextBubble = styled(motion.div)`
  position: absolute;
  left: -220px;
  top: -50%;
  background: #f0f0f0;
  padding: 10px 15px;
  border-radius: 18px;
  min-width: 100px;
  max-width: 200px;
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

export const HideButton = styled.button`
  position: absolute;
  top: -5px;
  left: -5px;
  width: 16px;
  height: 16px;
  background-color: #ff4d4d;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    background-color: #ff3333;
  }
`;

export const UserMessage = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  margin-bottom: 10px;
  word-wrap: break-word;
  align-self: flex-end;
  background-color: #000;
  color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

// Search Results
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
  border-radius: 8px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

export const SearchResultImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 4px;
`;

export const SearchResultDetails = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 5px 0;
    font-size: 14px;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: #666;
    line-height: 1.4;
  }

  button {
    margin-top: 8px;
    padding: 4px 8px;
    background-color: #000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    
    &:hover {
      background-color: #333;
    }
  }
`;

// Pending Appointment Button
export const PendingAppointmentButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 80px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  color: white;

  ${({ $isNotEmpty }) => $isNotEmpty && css`
    animation: ${pulseAnimation} 2s infinite;
  `}
`;
// Cart Components
export const CartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  color: white;

  ${({ $isNotEmpty }) => $isNotEmpty && css`
    animation: ${pulseAnimation} 2s infinite;
  `}
`;

export const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff4d4d;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  min-width: 18px;
  text-align: center;
`;

export const CartContainer = styled.div`
  padding: 15px;
  overflow-y: auto;
  max-height: calc(100% - 60px);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
    border-radius: 4px;
  }

  button {
    background-color: #ff3333;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    
    &:hover {
      background-color: #ff3333;
    }
  }
  
  input {
    width: 50px;
    padding: 4px;
    margin: 0 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
  }
`;

export const CartTotal = styled.div`
  font-weight: bold;
  margin-top: 15px;
  text-align: right;
  padding: 10px;
  border-top: 2px solid #e0e0e0;
  font-size: 16px;
`;

export const CheckoutButton = styled.button`
  background-color: #000;
  color: white;
  padding: 12px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background-color: #333;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// New styles for the jump to bottom button
export const JumpToBottomButton = styled.button`
  position: absolute;
  bottom: 70px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
`;

// New styles for the avatar and header text
export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #888;
  border-radius: 50%;
  margin-right: 10px;
`;

export const HeaderText = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Update ChatHeader to include the new layout
export const ChatHeader = styled.div`
  background-color: #000000ee;
  color: #ffffff;
  padding: 10px 15px;
  font-weight: bold;
  position: relative;
  display: flex;
  align-items: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const LoginInput = styled.input`
  margin-bottom: 10px;
  padding: 8px 12px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

export const LoginButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }

  svg {
    margin-right: 8px;
  }
`;


// Add these new styles to your existing AmorphousChatStyles.js file

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
`;

export const AuthInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

export const AuthButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;
  margin-top: 10px;

  &:hover {
    background-color: #333;
  }
`;

export const AuthLink = styled.a`
  color: #666;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  margin-top: 8px;

  &:hover {
    color: #000;
    text-decoration: underline;
  }
`;

export const PreferenceSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #000000;
  }

  option {
    padding: 8px;
  }
`;

export const AppointmentContainer = styled.div`
  padding: 15px;
  overflow-y: auto;
  max-height: calc(100% - 60px);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

export const AppointmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const AppointmentDetails = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 5px 0;
    font-size: 16px;
    font-weight: 600;
  }

  p {
    margin: 2px 0;
    font-size: 14px;
    color: #666;
  }
`;

export const AppointmentActions = styled.div`
  display: flex;
  gap: 8px;

  button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;

    &:first-child {
      background-color: #000;
      color: white;

      &:hover {
        background-color: #333;
      }
    }

    &:last-child {
      background-color: #ff3333;
      color: white;

      &:hover {
        background-color: #ff3333;
      }
    }
  }
`;

export const ChatContainer = styled.div`
  // styles here
`;

export const PreferenceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin: 20px 0;
`;

export const PreferenceBox = styled.div`
  border: 2px solid ${({ selected }) => (selected ? 'blue' : '#ccc')};
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
  background-color: ${({ selected }) => (selected ? '#e0f7fa' : 'white')};

  &:hover {
    border-color: blue;
  }
`;

export const LogoutButton = styled.button`
  position: absolute;
  top: 0px;
  right: -15px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  z-index: 99999;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    background-color: red;
    border-radius: 50%;
  }

  svg {
    color: #333;
  }

  &:hover {
    svg {
      color: #666;
    }
  }
`;
