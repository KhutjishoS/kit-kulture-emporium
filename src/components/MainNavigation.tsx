import React, { useState } from 'react';
import { ChevronDown, Menu, X, Search, ShoppingCart, User, Heart, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useNavigate } from 'react-router-dom';

interface MainNavigationProps {
  cartItems: number;
  onCartOpen: () => void;
  onAuthOpen: (mode: 'login' | 'signup') => void;
  onNavCategoryClick?: (category: string, subcategory?: string, item?: string) => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ cartItems, onCartOpen, onAuthOpen, onNavCategoryClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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
    console.log('Searching for:', searchQuery);
  };

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
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </form>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Heart className="w-5 h-5" />
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
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors cursor-pointer"
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
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <Input 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-4">
              <button 
                className="block w-full text-left py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                onClick={() => handleCategoryClick('home')}
              >
                Home
              </button>

              {Object.entries(navigationData).map(([key, category]) => (
                <div key={key} className="space-y-2">
                  <button 
                    className="block w-full text-left py-2 text-sm font-medium hover:text-blue-600 transition-colors border-b border-gray-100"
                    onClick={() => handleCategoryClick(key)}
                  >
                    {category.title}
                  </button>
                  <div className="pl-4 space-y-2">
                    {category.subcategories.map((subcategory, index) => (
                      <div key={index} className="space-y-1">
                        <button
                          className="block w-full text-left py-1 text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium"
                          onClick={() => handleCategoryClick(key, subcategory.title)}
                        >
                          {subcategory.title}
                        </button>
                        <div className="pl-4 space-y-1">
                          {subcategory.items.slice(0, 3).map((item, itemIndex) => (
                            <button
                              key={itemIndex}
                              className="block w-full text-left py-1 text-xs text-gray-600 hover:text-blue-600 transition-colors"
                              onClick={() => handleCategoryClick(key, subcategory.title, item)}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button 
                className="block w-full text-left py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                onClick={() => handleCategoryClick('gallery')}
              >
                Gallery
              </button>

              <button 
                className="block w-full text-left py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                onClick={() => handleCategoryClick('sale')}
              >
                Sale
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainNavigation;
