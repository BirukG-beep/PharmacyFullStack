// /hooks/useCart.js
import { useState } from "react";
import { generateReceipt } from "../helpers/pdfHelper";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [countCart, setCountCart] = useState(0);



  const addToCart = (item, quantity) => {
      console.log(item)
      console.log(quantity)
    const tax = item.price * 0.15;
    setCartItems(prev => [
      ...prev,
      {
        name: item.name,
        price: item.price,
        quantity,
        tax,
        itemTax: "15%",
        totalPrice: item.price * quantity + tax,
      },
    ]);
    setCountCart(prev => prev + 1);
  };

  const downloadReceipt = () => generateReceipt(cartItems);

  return { cartItems, countCart, addToCart, downloadReceipt };
};