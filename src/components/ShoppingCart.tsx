import React from 'react';
import { Minus, Plus, X, ShoppingBag, Trash2, CreditCard, Truck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from '@/contexts/CartContext';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    cartCount, 
    totalPrice,
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();

  const shipping = totalPrice > 75 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  if (!isOpen) return null;

  const handleQuantityChange = (productId: number, size: string, newQuantity: number) => {
    updateQuantity(productId, size, newQuantity);
  };

  const handleRemoveItem = (productId: number, size: string) => {
    removeFromCart(productId, size);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <Badge variant="secondary" className="text-sm">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
          </Badge>
            {cartItems.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Cart Items */}
        <div className="p-6 space-y-4 flex-1">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-400 text-sm mb-6">Add some products to get started</p>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <Card key={`${item.id}-${item.size}`} className="border border-gray-200 hover:shadow-md transition-shadow">
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
                          {item.size && ` • Size: ${item.size}`}
                        </p>
                        
                        {/* Price and Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                          <span className="font-semibold text-blue-600">
                              R{(item.price * item.quantity).toFixed(2)}
                            </span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-xs text-gray-500 line-through">
                                R{(item.originalPrice * item.quantity).toFixed(2)}
                          </span>
                            )}
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-8 h-8 p-0 hover:bg-red-50 hover:border-red-200"
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-8 h-8 p-0 hover:bg-green-50 hover:border-green-200"
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                        onClick={() => handleRemoveItem(item.id, item.size)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50 sticky bottom-0">
            {/* Price Breakdown */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">R{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  Shipping
                </span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `R${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">R{tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">R{finalTotal.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3"
                onClick={() => {
                  // Handle checkout
                  console.log('Proceeding to checkout...');
                }}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Proceed to Checkout
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
            
            {/* Free Shipping Notice */}
            {totalPrice < 75 && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Free shipping</strong> on orders over R75! 
                  Add R{(75 - totalPrice).toFixed(2)} more to qualify.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
