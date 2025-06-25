import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, Search, ShoppingCart, User, Heart, LogOut, Clock, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useSearch } from '@/contexts/SearchContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useNavigate } from 'react-router-dom';
import products from '../pages/productsData';

interface MainNavigationProps {
  cartItems: number;
  onCartOpen: () => void;
  onWishlistOpen: () => void;
  onSearchResultsOpen: () => void;
  onAuthOpen: (mode: 'login' | 'signup') => void;
  onNavCategoryClick?: (category: string, subcategory?: string, item?: string) => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ 
  cartItems, 
  onCartOpen, 
  onWishlistOpen,
  onSearchResultsOpen,
  onAuthOpen, 
  onNavCategoryClick 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { user, signOut } = useAuth();
  const { wishlistCount } = useWishlist();
  const { performSearch, getSearchSuggestions } = useSearch();
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Save recent searches to localStorage
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, 5)));
    }
  }, [recentSearches]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigationData = {
    football: {
      title: 'Our Products',
      subcategories: [
        {
          title: 'Apparel',
          items: ['Bucket Hats', 'Camo Long Jackets', 'Caps', 'Hoodies', 'Nkoyoyo Photohoot', 'Quilted puff jacket', 'Shorts', 'Sweaters', 'Tracksuits']
        },
        {
          title: 'Footwear',
          items: ['Sneakers', 'Slides & Sandals', 'Football Boots', 'View All']
        }
      ]
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to recent searches
      setRecentSearches(prev => {
        const newSearches = [searchQuery.trim(), ...prev.filter(s => s !== searchQuery.trim())];
        return newSearches.slice(0, 5);
      });

      // Perform search
      performSearch(searchQuery.trim(), products);
      onSearchResultsOpen();
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setRecentSearches(prev => {
      const newSearches = [suggestion, ...prev.filter(s => s !== suggestion)];
      return newSearches.slice(0, 5);
    });
    performSearch(suggestion, products);
    onSearchResultsOpen();
    setShowSuggestions(false);
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    performSearch(search, products);
    onSearchResultsOpen();
    setShowSuggestions(false);
  };

  const suggestions = getSearchSuggestions(searchQuery, products);

  const handleCategoryClick = (category: string, subcategory?: string, item?: string) => {
    if (category === 'home') {
      navigate('/');
      return;
    }
    if (category === 'gallery') {
      navigate('/gallery');
      return;
    }
    if (category === 'sale') {
      navigate('/sale');
      return;
    }
    if (item) {
      const path = `/products/${item.toLowerCase().replace(/ /g, '-')}`;
      navigate(path);
    }
    if (onNavCategoryClick) {
      onNavCategoryClick(category, subcategory, item);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Online-Cloth
            </h1>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8 relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="w-full relative">
              <Input 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 0 || recentSearches.length > 0)}
                className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="p-2">
                      <div className="text-xs font-medium text-gray-500 px-3 py-1">Suggestions</div>
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md flex items-center gap-2"
                        >
                          <TrendingUp className="w-3 h-3 text-blue-500" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="p-2 border-t border-gray-100">
                      <div className="text-xs font-medium text-gray-500 px-3 py-1">Recent Searches</div>
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentSearchClick(search)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md flex items-center gap-2"
                        >
                          <Clock className="w-3 h-3 text-gray-400" />
                          {search}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex relative" 
              onClick={onWishlistOpen}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </Badge>
              )}
              <span className="ml-2">Wishlist</span>
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="hidden md:inline text-sm text-gray-600">
                  {user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:inline ml-2">Sign Out</span>
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => onAuthOpen('login')}>
                <User className="w-5 h-5" />
                <span className="hidden md:inline ml-2">Account</span>
              </Button>
            )}
            
            <Button variant="ghost" size="sm" className="relative" onClick={onCartOpen}>
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                  {cartItems}
                </Badge>
              )}
              <span className="hidden md:inline ml-2">Cart</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Main Navigation - Desktop */}
        <div className="hidden md:block py-2">
          <NavigationMenu className="mx-auto">
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer"
                  onClick={() => handleCategoryClick('home')}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              {Object.entries(navigationData).map(([key, category]) => (
                <NavigationMenuItem key={key}>
                  <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors">
                    {category.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-6 bg-white rounded-lg shadow-lg">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {category.subcategories.map((subcategory, index) => (
                          <div key={index} className="space-y-3">
                            <h3 
                              className="font-semibold text-gray-900 pb-2 border-b border-gray-200 cursor-pointer hover:text-blue-600 transition-colors"
                              onClick={() => handleCategoryClick(key, subcategory.title)}
                            >
                              {subcategory.title}
                            </h3>
                            <ul className="space-y-2">
                              {subcategory.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <button
                                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors text-left w-full"
                                    onClick={() => handleCategoryClick(key, subcategory.title, item)}
                                  >
                                    {item}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer"
                  onClick={() => handleCategoryClick('gallery')}
                >
                  Gallery
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer"
                  onClick={() => handleCategoryClick('sale')}
                >
                  Sale
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
            {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Input 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-2">
              <button 
                  className="w-full text-left px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                onClick={() => handleCategoryClick('home')}
              >
                Home
              </button>

              {Object.entries(navigationData).map(([key, category]) => (
                <div key={key} className="space-y-2">
                    <div className="px-4 py-2 text-sm font-medium text-gray-900">
                    {category.title}
                    </div>
                    {category.subcategories.map((subcategory, index) => (
                      <div key={index} className="ml-4 space-y-1">
                        <div className="px-4 py-1 text-sm font-medium text-gray-700">
                          {subcategory.title}
                        </div>
                        {subcategory.items.map((item, itemIndex) => (
                            <button
                              key={itemIndex}
                            className="w-full text-left px-4 py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                              onClick={() => handleCategoryClick(key, subcategory.title, item)}
                            >
                              {item}
                            </button>
                          ))}
                      </div>
                    ))}
                </div>
              ))}

              <button 
                  className="w-full text-left px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                  onClick={() => handleCategoryClick('gallery')}
              >
                  Gallery
              </button>

              <button 
                  className="w-full text-left px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                onClick={() => handleCategoryClick('sale')}
              >
                Sale
              </button>
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start relative" 
                  onClick={onWishlistOpen}
                >
                  <Heart className="w-5 h-5" />
                  <span className="ml-2">Wishlist</span>
                  {wishlistCount > 0 && (
                    <Badge className="ml-auto bg-pink-500 text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start relative" 
                  onClick={onCartOpen}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="ml-2">Cart</span>
                  {cartItems > 0 && (
                    <Badge className="ml-auto bg-red-500 text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                      {cartItems}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainNavigation;
