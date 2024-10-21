import React from "react";
import { TextBubble as StyledTextBubble, HideButton } from "./AmorphousChatStyles";

const TextBubble = ({ popupMessage, hidePopup, setIsUserInteracting }) => (
  <StyledTextBubble
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
    onMouseEnter={() => setIsUserInteracting(true)}
    onMouseLeave={() => setIsUserInteracting(false)}
  >
    <HideButton onClick={hidePopup} />
    {popupMessage.length > 60 ? `${popupMessage.slice(0, 60)}...` : popupMessage}
  </StyledTextBubble>
);

export default TextBubble;