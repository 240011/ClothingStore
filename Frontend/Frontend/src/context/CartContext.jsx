// import React, { createContext, useContext, useReducer, useEffect } from 'react';

// const CartContext = createContext();

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_ITEM': {
//       const existingItemIndex = state.items.findIndex(
//         item => 
//           item.product.id === action.payload.product.id &&
//           item.selectedSize === action.payload.selectedSize &&
//           item.selectedColor === action.payload.selectedColor
//       );

//       let newItems;
//       if (existingItemIndex >= 0) {
//         newItems = state.items.map((item, index) =>
//           index === existingItemIndex
//             ? { ...item, quantity: item.quantity + action.payload.quantity }
//             : item
//         );
//       } else {
//         newItems = [...state.items, action.payload];
//       }

//       const newTotal = newItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      
//       return {
//         ...state,
//         items: newItems,
//         total: newTotal
//       };
//     }

//     case 'UPDATE_QUANTITY': {
//       const newItems = state.items.map((item, index) =>
//         index === parseInt(action.payload.id)
//           ? { ...item, quantity: Math.max(1, action.payload.quantity) }
//           : item
//       );
      
//       const newTotal = newItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      
//       return {
//         ...state,
//         items: newItems,
//         total: newTotal
//       };
//     }

//     case 'REMOVE_ITEM': {
//       const newItems = state.items.filter((_, index) => index !== parseInt(action.payload));
//       const newTotal = newItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      
//       return {
//         ...state,
//         items: newItems,
//         total: newTotal
//       };
//     }

//     case 'CLEAR_CART':
//       return {
//         items: [],
//         total: 0
//       };

//     case 'LOAD_CART':
//       return action.payload;

//     default:
//       return state;
//   }
// };

// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, {
//     items: [],
//     total: 0
//   });

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       try {
//         const cartData = JSON.parse(savedCart);
//         dispatch({ type: 'LOAD_CART', payload: cartData });
//       } catch (error) {
//         console.error('Error loading cart:', error);
//       }
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(state));
//   }, [state]);

//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };