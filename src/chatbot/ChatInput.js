import React from "react";
import { Send } from "lucide-react";
import {
  ChatInputContainer,
  ChatInput as StyledChatInput,
  SendButton,
} from "./AmorphousChatStyles";

const ChatInput = ({ userMessage, setUserMessage, handleSendMessage }) => (
  <ChatInputContainer>
    <StyledChatInput
      type="text"
      placeholder="Type a message..."
      value={userMessage}
      onChange={(e) => setUserMessage(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
    />
    <SendButton onClick={handleSendMessage}>
      <Send size={24} />
    </SendButton>
  </ChatInputContainer>
);

export default ChatInput;