import React from "react";
import {
  ChatMessages as StyledChatMessages,
  UserMessage,
  AIMessage,
  SearchResultContainer,
  SearchResultItem,
  SearchResultImage,
  SearchResultDetails,
} from "./AmorphousChatStyles";

const ChatMessages = ({ messages, userInfo, addToCart, chatMessagesRef }) => (
  <StyledChatMessages ref={chatMessagesRef}>
    {messages.map((msg, index) =>
      msg.sender === "user" ? (
        <UserMessage key={index}>{msg.text}</UserMessage>
      ) : (
        <AIMessage key={index}>
          {msg.text}
          {userInfo &&
            userInfo.service_type !== "customer support" &&
            msg.searchResults && (
              <SearchResultContainer>
                {msg.searchResults.map((result, resultIndex) => (
                  <SearchResultItem key={resultIndex}>
                    <SearchResultImage
                      src={result.images[0]}
                      alt={result.title}
                    />
                    <SearchResultDetails>
                      <h4>{result.title}</h4>
                      <p>Price: ${result.price}</p>
                      <p>Rating: {result.rating}/5</p>
                      <button onClick={() => addToCart(result)}>
                        Add to Cart
                      </button>
                    </SearchResultDetails>
                  </SearchResultItem>
                ))}
              </SearchResultContainer>
            )}
        </AIMessage>
      )
    )}
  </StyledChatMessages>
);

export default ChatMessages;