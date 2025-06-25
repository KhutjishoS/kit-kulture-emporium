import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  originalPrice?: number;
  badge?: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  totalPrice: number;
  addToCart: (product: any, size: string) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number, size?: string) => boolean;
  getItemQuantity: (productId: number, size: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = item.originalPrice && item.originalPrice > item.price ? item.originalPrice : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);

  const addToCart = (product: any, size: string) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        
        toast({
          title: "Quantity Updated",
          description: `${product.name} (${size}) quantity increased to ${updatedItems[existingItemIndex].quantity}`,
        });
        
        return updatedItems;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          originalPrice: product.originalPrice,
          badge: product.badge,
          size: size,
          quantity: 1
        };
        
        toast({
          title: "Added to Cart",
          description: `${product.name} (${size}) has been added to your cart`,
        });
        
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (productId: number, size: string) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === productId && item.size === size);
      const updatedItems = prevItems.filter(item => !(item.id === productId && item.size === size));
      
      if (item) {
        toast({
          title: "Removed from Cart",
          description: `${item.name} (${size}) has been removed from your cart`,
        });
      }
      
      return updatedItems;
    });
  };

  const updateQuantity = (productId: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === productId && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      });
      
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  };

  const isInCart = (productId: number, size?: string) => {
    if (size) {
      return cartItems.some(item => item.id === productId && item.size === size);
    }
    return cartItems.some(item => item.id === productId);
  };

  const getItemQuantity = (productId: number, size: string) => {
    const item = cartItems.find(item => item.id === productId && item.size === size);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    cartCount,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 