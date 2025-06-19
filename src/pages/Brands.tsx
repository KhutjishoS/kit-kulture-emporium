import React, { useState } from 'react';
import MainNavigation from '../components/MainNavigation';

const galleryImages = Array.from({ length: 190 }, (_, i) => `/images/gallery/g (${i + 1}).jpg`);

const Gallery: React.FC = () => {
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
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Gallery Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {galleryImages.map((src, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden shadow-md bg-white flex items-center justify-center">
              <img 
                src={src} 
                alt={`Gallery photo ${idx + 1}`}
                className="object-cover w-full h-72"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery; 