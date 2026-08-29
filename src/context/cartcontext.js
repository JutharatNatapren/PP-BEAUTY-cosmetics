"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const totalItems = useMemo(() => {
    return cart.reduce((total, product) => {
      return total + (product.quantity || 1);
    }, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((total, product) => {
      return total + Number(product.price || 0) * (product.quantity || 1);
    }, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}