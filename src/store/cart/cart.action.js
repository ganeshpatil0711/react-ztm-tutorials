import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";


const addCartItem = (cartItems, producttoAdd) => {

  const existingCartItem = cartItems.find(item => item.id === producttoAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === producttoAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { ...producttoAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id == cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  );
}

const clearCartItem = (cartItems, cartItemToRemove) => cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);

const setIsCartOpen = (value) => {
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, value);
}

const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

const clearItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = clearCartItem(cartItems, cartItemToRemove);
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}