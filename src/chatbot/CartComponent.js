import React from "react";
import {
  CartContainer,
  CartItem,
  CartTotal,
  CheckoutButton,
} from "./AmorphousChatStyles";
import { X } from "lucide-react";

const CartComponent = ({
  cart,
  updateCartItemQuantity,
  removeFromCart,
  calculateTotal,
  handleCheckout,
}) => (
  <CartContainer>
    {cart.map((item) => (
      <CartItem key={item.id}>
        <img src={item.images[0]} alt={item.title} width="50" height="50" />
        <div>
          <h4>{item.title}</h4>
          <p>Price: ${item.price}</p>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              updateCartItemQuantity(item.id, parseInt(e.target.value))
            }
          />
        </div>
        <button onClick={() => removeFromCart(item.id)}><X size={16} /></button>
      </CartItem>
    ))}
    <CartTotal>Total: ${calculateTotal(cart).toFixed(2)}</CartTotal>
    <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>
  </CartContainer>
);

export default CartComponent;