import React, { useState } from 'react';
import MainNavigation from '../components/MainNavigation';

const Sale: React.FC = () => {
  const [cartItems, setCartItems] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const openAuth = (mode: 'login' | 'signup') => setIsAuthOpen(true);

  return (
    <div className="min-h-screen">
      <MainNavigation 
        cartItems={cartItems}
        onCartOpen={() => setIsCartOpen(true)}
        onAuthOpen={openAuth}
      />
      <div className="flex items-center justify-center h-[80vh]">
        <h1 className="text-4xl font-bold text-red-600">Sale Page</h1>
      </div>
    </div>
  );
};

export default Sale; 