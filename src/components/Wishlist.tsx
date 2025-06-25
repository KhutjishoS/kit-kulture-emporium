import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

const Wishlist: React.FC<WishlistProps> = ({ isOpen, onClose }) => {
  const { 
    wishlistItems, 
    wishlistCount, 
    removeFromWishlist, 
    clearWishlist 
  } = useWishlist();

  const { addToCart, isInCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      originalPrice: item.originalPrice,
      badge: item.badge
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-red-50 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500 fill-current" />
              <h2 className="text-xl font-bold text-gray-900">My Wishlist</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <Badge variant="secondary" className="text-sm">
              {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'}
            </Badge>
            {wishlistItems.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearWishlist}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="p-6 space-y-4 flex-1">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Your wishlist is empty</p>
              <p className="text-gray-400 text-sm mb-6">Start adding items you love to your wishlist</p>
              <Button className="bg-gradient-to-r from-pink-500 to-red-500" onClick={onClose}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {wishlistItems.map((item) => (
                <Card key={item.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                        {item.badge && (
                          <Badge className="absolute -top-1 -right-1 text-xs bg-red-500">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">
                          {item.category && `${item.category}`}
                        </p>
                        
                        {/* Price */}
                        <div className="flex flex-col mb-3">
                          <span className="font-semibold text-blue-600">
                            R{item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-xs text-gray-500 line-through">
                              R{item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            className={`flex-1 text-xs ${
                              isInCart(item.id)
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                            }`}
                            onClick={() => handleMoveToCart(item)}
                          >
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50 sticky bottom-0">
            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg"
                size="lg"
                onClick={onClose}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  💝 Save items you love for later
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist; 