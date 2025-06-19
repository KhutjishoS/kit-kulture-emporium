import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star } from 'lucide-react';
import MainNavigation from '../components/MainNavigation';
import products from './productsData';

const ProductCategoryPage = () => {
  const { category } = useParams();
  const [cartItems, setCartItems] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const openAuth = (mode: 'login' | 'signup') => setIsAuthOpen(true);

  const displayCategory = category ? category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '';
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase().replace(/ /g, '-') === category
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <MainNavigation 
        cartItems={cartItems}
        onCartOpen={() => setIsCartOpen(true)}
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
                />
                {product.badge && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium">
                    {product.badge}
                  </Badge>
                )}
                <button 
                  className={`absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all text-gray-700`}
                >
                  <Heart className="w-4 h-4" />
                </button>
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
                <button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Add to Cart
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-12">No products found for this category.</div>
        )}
      </div>
    </div>
  );
};

export default ProductCategoryPage; 