import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearItemFromCart: () => { },
  cartCount: 0,
  cartTotal: 0
});

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS'
};


const cartReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload }

    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload }

    default:
      throw new Error(`unhandled type ${type} in cartReducer`);

  }
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const setIsCartOpen = (value) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, value));
  }

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);

    dispatch(createAction(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal
      }
    ))

  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (cartItemToRemove) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};
