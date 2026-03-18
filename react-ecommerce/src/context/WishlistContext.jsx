import { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load favorites from the browser's memory so they stay after refresh
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('berryWishlist')) || [];
    setWishlist(saved);
  }, []);

  // Save to memory whenever the list changes
  useEffect(() => {
    localStorage.setItem('berryWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};