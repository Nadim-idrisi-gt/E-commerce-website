import React, { useState } from "react";
import { ShopContext } from "./ShopContext";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    console.log(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if(cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const removeFromCart = (itemId, size, removeAll = false) => {

  setCartItems((prev) => {

    const copy = { ...prev };

    if (!copy[itemId] || !copy[itemId][size]) return prev;

    if (removeAll) {

      delete copy[itemId][size];

    } else {

      copy[itemId][size] -= 1;

      if (copy[itemId][size] <= 0) {

        delete copy[itemId][size];

      }

    }
    
     if (Object.keys(copy[itemId]).length === 0) {

      delete copy[itemId];

    }

    return copy;

  });

};

const getSubtotal = () => {
  let total = 0;

  for (const item in cartItems) {
    for (const size in cartItems[item]) {
      if (cartItems[item][size] > 0) {
        const product = products.find(p => p._id.toString() === item);
        if (product) {
          total += product.price * cartItems[item][size];
        }
      }
    }
  }

  return total;
};


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    removeFromCart,
    getSubtotal,
    paymentMethod,
setPaymentMethod,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
