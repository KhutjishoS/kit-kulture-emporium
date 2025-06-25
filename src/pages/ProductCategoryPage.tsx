import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import MainNavigation from '../components/MainNavigation';
import ShoppingCartComponent from '../components/ShoppingCart';
import Wishlist from '../components/Wishlist';
import SearchResults from '../components/SearchResults';
import SizeSelector from '../components/SizeSelector';
import AuthModal from '../components/AuthModal';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import products from './productsData';

const ProductCategoryPage = () => {
  const { category } = useParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
  
  const { addToCart, cartCount, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const displayCategory = category ? category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '';
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase().replace(/ /g, '-') === category
  );

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleAddToCart = (product: any) => {
    const selectedSize = selectedSizes[product.id];
    if (!selectedSize) {
      // Show error or prompt to select size
      return;
    }
    
    addToCart(product, selectedSize);
  };

  const handleToggleWishlist = (product: any) => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      originalPrice: product.originalPrice,
      badge: product.badge,
      rating: product.rating
    });
  };

  const openAuth = (mode: 'login' | 'signup') => setIsAuthOpen(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <MainNavigation 
        cartItems={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
        onWishlistOpen={() => setIsWishlistOpen(true)}
        onSearchResultsOpen={() => setIsSearchResultsOpen(true)}
        onAuthOpen={openAuth}
      />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">{displayCategory}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                {product.badge && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium">
                    {product.badge}
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all ${
                    isInWishlist(product.id) ? 'text-red-500' : 'text-gray-700'
                  }`}
                  onClick={() => handleToggleWishlist(product)}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.rating})</span>
                </div>
                <h4 className="font-semibold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-600">R{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">R{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mb-4">
                  <SizeSelector
                    sizes={product.sizes || []}
                    availableSizes={product.availableSizes || []}
                    selectedSize={selectedSizes[product.id] || null}
                    onSizeSelect={(size) => handleSizeSelect(product.id, size)}
                  />
                </div>

                <Button 
                  onClick={() => handleAddToCart(product)}
                  disabled={!selectedSizes[product.id] || product.availableSizes?.length === 0}
                  className={`w-full font-semibold py-2 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg ${
                    !selectedSizes[product.id] || product.availableSizes?.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isInCart(product.id, selectedSizes[product.id])
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                  }`}
                >
                  {!selectedSizes[product.id] 
                    ? 'Select Size'
                    : product.availableSizes?.length === 0
                    ? 'Out of Stock'
                    : isInCart(product.id, selectedSizes[product.id])
                    ? (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        In Cart
                      </>
                    )
                    : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-12">No products found for this category.</div>
        )}
      </div>

      {/* Shopping Cart Modal */}
      <ShoppingCartComponent isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Wishlist Modal */}
      <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />

      {/* Search Results Modal */}
      <SearchResults isOpen={isSearchResultsOpen} onClose={() => setIsSearchResultsOpen(false)} />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode="login"
      />
    </div>
  );
};

export default ProductCategoryPage; 