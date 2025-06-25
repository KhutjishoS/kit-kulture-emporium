import React, { useState } from 'react';
import { X, Search, Filter, SortAsc, Star, Heart, ShoppingCart, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearch } from '@/contexts/SearchContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface SearchResultsProps {
  isOpen: boolean;
  onClose: () => void;
}

type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'name';
type FilterOption = 'all' | 'on-sale' | 'new-arrivals';

const SearchResults: React.FC<SearchResultsProps> = ({ isOpen, onClose }) => {
  const { searchQuery, searchResults, isSearching, hasSearched, clearSearch } = useSearch();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      originalPrice: product.originalPrice,
      badge: product.badge
    });
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

  // Filter and sort results
  const processedResults = React.useMemo(() => {
    let filtered = searchResults;

    // Apply filters
    if (filterBy === 'on-sale') {
      filtered = filtered.filter(product => product.originalPrice && product.originalPrice > product.price);
    } else if (filterBy === 'new-arrivals') {
      filtered = filtered.filter(product => product.badge === 'New');
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'name':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [searchResults, sortBy, filterBy]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-start pt-20">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Search className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Search Results</h2>
              {searchQuery && (
                <Badge variant="secondary" className="text-sm">
                  "{searchQuery}"
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Search Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {isSearching ? 'Searching...' : hasSearched ? `${processedResults.length} result${processedResults.length === 1 ? '' : 's'} found` : 'Enter a search term'}
            </span>
            {hasSearched && (
              <Button variant="ghost" size="sm" onClick={clearSearch} className="text-blue-600">
                Clear Search
              </Button>
            )}
          </div>
        </div>

        {/* Filters and Sort */}
        {hasSearched && processedResults.length > 0 && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter:</span>
                <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="on-sale">On Sale</SelectItem>
                    <SelectItem value="new-arrivals">New Arrivals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Sort:</span>
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="overflow-y-auto max-h-[60vh]">
          {isSearching ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for "{searchQuery}"...</p>
            </div>
          ) : !hasSearched ? (
            <div className="p-12 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Start searching for products</p>
              <p className="text-gray-400 text-sm">Enter keywords to find what you're looking for</p>
            </div>
          ) : processedResults.length === 0 ? (
            <div className="p-12 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No results found</p>
              <p className="text-gray-400 text-sm mb-6">Try different keywords or check your spelling</p>
              <Button onClick={clearSearch} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedResults.map((product) => (
                  <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border border-gray-200 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
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
                    
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">({product.rating || 0})</span>
                      </div>
                      
                      <h4 className="font-semibold text-sm text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h4>
                      
                      {product.category && (
                        <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                      )}
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-blue-600">R{product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">R{product.originalPrice.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleAddToCart(product)}
                        className={`w-full text-xs font-semibold py-2 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg ${
                          isInCart(product.id)
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                        }`}
                      >
                        {isInCart(product.id) ? (
                          <>
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            In Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {hasSearched && processedResults.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Showing {processedResults.length} of {searchResults.length} results</span>
              <Button variant="outline" size="sm" onClick={onClose}>
                Close Results
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults; 