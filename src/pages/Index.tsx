import React, { useState } from 'react';
import { Star, Heart, Play, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import MainNavigation from '../components/MainNavigation';
import ShoppingCartComponent from '../components/ShoppingCart';
import Wishlist from '../components/Wishlist';
import SearchResults from '../components/SearchResults';
import SizeSelector from '../components/SizeSelector';
import AuthModal from '../components/AuthModal';
import ProductFilter from '../components/ProductFilter';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import products from './productsData';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});

  const { addToCart, cartCount, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const categories = ['All', 'Football Tops', 'Training Gear', 'Accessories', 'Boots'];
  
  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    if (value === 'all') {
      setFilteredProducts(products);
    } else if (value === 'Brands') {
      // Filter products by brand (assuming 'brand' property exists in product objects)
      const brandProducts = products.filter(product => product.brand);
      setFilteredProducts(brandProducts);
    } else {
      const filtered = products.filter(product => product.category === value);
      setFilteredProducts(filtered);
    }
  };

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

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleNavCategoryClick = (category: string, subcategory?: string, item?: string) => {
    if (item) {
      setSelectedCategory(item);
    } else if (subcategory) {
      setSelectedCategory(subcategory);
    } else if (category) {
      setSelectedCategory(category);
    }
  };

  const filterOptions = [
    { label: 'All Products', value: 'all' },
    { label: 'Bucket Hats', value: 'Bucket Hats' },
    { label: 'Camo Long Jackets', value: 'Camo Long Jackets' },
    { label: 'Caps', value: 'Caps' },
    { label: 'Hoodies', value: 'Hoodies' },
    { label: 'Quilted puff jacket', value: 'Quilted puff jacket' },
    { label: 'Shorts', value: 'Shorts' },
    { label: 'Sweaters', value: 'Sweaters' },
    { label: 'Tracksuits', value: 'Tracksuits' },
    { label: 'Brands', value: 'Brands' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Main Navigation */}
      <MainNavigation 
        cartItems={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
        onWishlistOpen={() => setIsWishlistOpen(true)}
        onSearchResultsOpen={() => setIsSearchResultsOpen(true)}
        onAuthOpen={openAuth}
        onNavCategoryClick={handleNavCategoryClick}
      />

      {/* Hero Section */}
      {/* Removed as per user request */}

      {/* Advertising Section with Video */}
      {/* Removed as per user request */}

      {/* Category Filter */}
      {/* Removed as per user request */}

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated selection of premium sports apparel and equipment
            </p>
          </div>
          
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Choose Online-Cloth?</h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Experience the difference with our premium sports apparel and unmatched customer service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold">Premium Quality</h4>
              <p className="text-blue-100">Authentic products from top brands worldwide</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold">Customer Satisfaction</h4>
              <p className="text-blue-100">99% customer satisfaction rate with easy returns</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Badge className="w-8 h-8 bg-transparent border-2 border-white text-white">✓</Badge>
              </div>
              <h4 className="text-xl font-semibold">Fast Delivery</h4>
              <p className="text-blue-100">Free shipping on orders over R75 worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get exclusive access to new arrivals, special offers, and professional sports insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg"
              onClick={() => openAuth('signup')}
            >
              Sign Up Now
            </Button>
            <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-6 py-3 rounded-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                SportsPro Elite
              </h5>
              <p className="text-gray-400 mb-4">
                Your premier destination for professional sports apparel and equipment.
              </p>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">About Us</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
                <li><button className="hover:text-white transition-colors">Size Guide</button></li>
                <li><button className="hover:text-white transition-colors">Returns</button></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Categories</h6>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Football</button></li>
                <li><button className="hover:text-white transition-colors">Training</button></li>
                <li><button className="hover:text-white transition-colors">Lifestyle</button></li>
                <li><button className="hover:text-white transition-colors">Kids</button></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Support</h6>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Help Center</button></li>
                <li><button className="hover:text-white transition-colors">Track Order</button></li>
                <li><button className="hover:text-white transition-colors">Shipping Info</button></li>
                <li><button className="hover:text-white transition-colors">FAQ</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SportsPro Elite. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
        initialMode={authMode}
      />

      {/* Product Filter Modal */}
      <ProductFilter 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
      />
    </div>
  );
};

export default Index;
