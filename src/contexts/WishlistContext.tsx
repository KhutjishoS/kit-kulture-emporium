import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  originalPrice?: number;
  badge?: string;
  rating?: number;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (product: WishlistItem) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: number) => boolean;
  moveToCart: (productId: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const wishlistCount = wishlistItems.length;

  const addToWishlist = (product: WishlistItem) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Already in Wishlist",
          description: `${product.name} is already in your wishlist`,
        });
        return prevItems;
      } else {
        const newItem = { ...product };
        
        toast({
          title: "Added to Wishlist",
          description: `${product.name} has been added to your wishlist`,
        });
        
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      const updatedItems = prevItems.filter(item => item.id !== productId);
      
      if (itemToRemove) {
        toast({
          title: "Removed from Wishlist",
          description: `${itemToRemove.name} has been removed from your wishlist`,
        });
      }
      
      return updatedItems;
    });
  };

  const toggleWishlist = (product: WishlistItem) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Remove from wishlist
        const updatedItems = prevItems.filter(item => item.id !== product.id);
        toast({
          title: "Removed from Wishlist",
          description: `${product.name} has been removed from your wishlist`,
        });
        return updatedItems;
      } else {
        // Add to wishlist
        const newItem = { ...product };
        toast({
          title: "Added to Wishlist",
          description: `${product.name} has been added to your wishlist`,
        });
        return [...prevItems, newItem];
      }
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist",
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const moveToCart = (productId: number) => {
    // This will be implemented when we connect with cart context
    const item = wishlistItems.find(item => item.id === productId);
    if (item) {
      toast({
        title: "Move to Cart",
        description: `This feature will be available soon!`,
      });
    }
  };

  const value = {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist,
    moveToCart,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
} 