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
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        cart: [],
      };

    case 'REGISTER':
      const newUser = {
        id: Date.now(),
        ...action.payload,
        role: 'user',
      };
      return {
        ...state,
        users: [...state.users, newUser],
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Función para hacer login con el backend
  const loginWithBackend = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Guardar el token en localStorage
        localStorage.setItem('token', data.access_token);
        // Hacer login con los datos del usuario
        dispatch({ type: 'LOGIN', payload: data.user });
        return { success: true, user: data.user };
      } else {
        const error = await response.json();
        return { success: false, message: error.message };
      }
    } catch (error) {
      console.error('Error de login:', error);
      return { success: false, message: 'Error de conexión con el servidor' };
    }
  };

  // Guardar datos en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  // Cargar datos desde localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedUser = localStorage.getItem('user');
    
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      cart.forEach(item => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
      });
    }
    
    if (savedUser && savedUser !== 'null') {
      dispatch({ type: 'LOGIN', payload: JSON.parse(savedUser) });
    }
  }, []);

  const value = {
    ...state,
    dispatch,
    addToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
    removeFromCart: (productId) => dispatch({ type: 'REMOVE_FROM_CART', payload: productId }),
    updateCartQuantity: (productId, quantity) => 
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: productId, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    login: (user) => dispatch({ type: 'LOGIN', payload: user }),
    loginWithBackend,
    logout: () => {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    },
    register: (userData) => dispatch({ type: 'REGISTER', payload: userData }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 