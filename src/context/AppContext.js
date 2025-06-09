'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import productsData from '../data/products.json';
import usersData from '../data/users.json';

const AppContext = createContext();

const initialState = {
  products: productsData,
  cart: [],
  user: null,
  users: usersData,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.cart.find(item => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        };
      }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'LOGIN':
      return { ...state, user: action.payload };

    case 'LOGOUT':
      return { ...state, user: null, cart: [] };

    case 'REGISTER':
      return {
        ...state,
        users: [...state.users, action.payload],
        user: action.payload
      };

    case 'INIT_CART':
      return { ...state, cart: action.payload };

    case 'INIT_USER':
      return { ...state, user: action.payload };

    // —— Nuevas acciones para CRUD de productos ——
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id
            ? { ...p, ...action.payload }
            : p
        ),
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) dispatch({ type: 'INIT_CART', payload: JSON.parse(savedCart) });
    const savedUser = localStorage.getItem('user');
    if (savedUser && savedUser !== 'null') {
      dispatch({ type: 'INIT_USER', payload: JSON.parse(savedUser) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  const value = {
    ...state,
    addToCart: product => dispatch({ type: 'ADD_TO_CART', payload: product }),
    removeFromCart: productId => dispatch({ type: 'REMOVE_FROM_CART', payload: productId }),
    updateCartQuantity: (productId, quantity) =>
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    login: user => dispatch({ type: 'LOGIN', payload: user }),
    logout: () => dispatch({ type: 'LOGOUT' }),
    register: userData => dispatch({ type: 'REGISTER', payload: userData }),
    // —— Métodos CRUD productos ——
    addProduct: product => dispatch({ type: 'ADD_PRODUCT', payload: product }),
    updateProduct: product => dispatch({ type: 'UPDATE_PRODUCT', payload: product }),
    deleteProduct: id => dispatch({ type: 'DELETE_PRODUCT', payload: id }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de AppProvider');
  }
  return context;
}
