import React from "react";
import { User, Maximize2, Minimize2, ShoppingCart, Calendar } from "lucide-react";
import {
  ChatHeader as StyledChatHeader,
  AvatarContainer,
  HeaderText,
  SizeToggleButton,
  CartButton,
  CartCount,
  PendingAppointmentButton,
} from "./AmorphousChatStyles";

const ChatHeader = ({
  isLoggedIn,
  chatHeaderText,
  authMode,
  isExpanded,
  setIsExpanded,
  userInfo,
  showCart,
  setShowCart,
  cart,
  showPendingAppointment,
  setShowPendingAppointment,
  pendingAppointments,
}) => (
  <StyledChatHeader>
    <AvatarContainer>
      <User size={24} />
    </AvatarContainer>
    <HeaderText>
      {isLoggedIn
        ? chatHeaderText
        : authMode === "signup"
        ? "Sign Up"
        : authMode === "forgot"
        ? "Reset Password"
        : "Login"}
    </HeaderText>
    {isLoggedIn && (
      <>
        <SizeToggleButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </SizeToggleButton>
        {userInfo && (
          <>
            {userInfo.service_type === "ecommerce" && (
              <CartButton onClick={() => setShowCart(!showCart)}>
                <ShoppingCart size={18} />
                {cart.length > 0 && <CartCount>{cart.length}</CartCount>}
              </CartButton>
            )}
            {userInfo.service_type === "appointmentbooking" && (
              <PendingAppointmentButton
                onClick={() => setShowPendingAppointment(!showPendingAppointment)}
              >
                <Calendar size={18} />
                {pendingAppointments.length > 0 && (
                  <CartCount>{pendingAppointments.length}</CartCount>
                )}
              </PendingAppointmentButton>
            )}
          </>
        )}
      </>
    )}
  </StyledChatHeader>
);

export default ChatHeader;