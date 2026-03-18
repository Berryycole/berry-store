import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

import CartProvider from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext'; // ADD THIS

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap the app in the WishlistProvider */}
    <WishlistProvider> 
      <CartProvider>
        <App />
      </CartProvider>
    </WishlistProvider>
  </StrictMode>
);