import React, { useState } from 'react';
import MainNavigation from '../components/MainNavigation';

// List of available images for remapping slots 14 to 65
const remappedImages = [
  '/images/gallery/g (14).JPG', '/images/gallery/g (15).JPG', '/images/gallery/g (16).JPG', '/images/gallery/g (17).JPG', '/images/gallery/g (18).JPG', '/images/gallery/g (19).JPG', '/images/gallery/g (20).JPG', '/images/gallery/g (21).JPG', '/images/gallery/g (22).JPG', '/images/gallery/g (23).JPG', '/images/gallery/g (24).JPG', '/images/gallery/g (25).JPG', '/images/gallery/g (26).JPG', '/images/gallery/g (27).JPG', '/images/gallery/g (28).JPG', '/images/gallery/g (29).JPG', '/images/gallery/g (30).JPG', '/images/gallery/g (31).JPG', '/images/gallery/g (32).JPG', '/images/gallery/g (33).JPG', '/images/gallery/g (34).JPG', '/images/gallery/g (35).JPG', '/images/gallery/g (36).JPG', '/images/gallery/g (37).JPG', '/images/gallery/g (38).JPG', '/images/gallery/g (39).JPG', '/images/gallery/g (40).JPG', '/images/gallery/g (41).JPG', '/images/gallery/g (42).JPG', '/images/gallery/g (43).JPG', '/images/gallery/g (44).JPG', '/images/gallery/g (45).JPG', '/images/gallery/g (46).JPG', '/images/gallery/g (47).JPG', '/images/gallery/g (48).JPG', '/images/gallery/g (49).JPG', '/images/gallery/g (50).JPG', '/images/gallery/g (51).JPG', '/images/gallery/g (52).JPG', '/images/gallery/g (53).JPG', '/images/gallery/g (54).JPG', '/images/gallery/g (55).JPG', '/images/gallery/g (56).JPG', '/images/gallery/g (57).JPG', '/images/gallery/g (58).JPG', '/images/gallery/g (59).JPG', '/images/gallery/g (60).JPG', '/images/gallery/g (61).JPG', '/images/gallery/g (62).JPG', '/images/gallery/g (63).JPG', '/images/gallery/g (64).JPG', '/images/gallery/g (65).JPG',
];

const galleryImages = Array.from({ length: 190 }, (_, i) => {
  if (i === 12) return '/images/gallery/one.JPG';
  if (i >= 13 && i <= 64) return remappedImages[i - 13];
  if (i === 189) return '/images/gallery/g (190).jpeg';
  return `/images/gallery/g (${i + 1}).jpg`;
});

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