import React, { createContext, useContext, useState, useMemo } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface SearchResult {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  originalPrice?: number;
  badge?: string;
  rating?: number;
  brand?: string;
  description?: string;
}

interface SearchContextType {
  searchQuery: string;
  searchResults: SearchResult[];
  isSearching: boolean;
  hasSearched: boolean;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string, products: SearchResult[]) => void;
  clearSearch: () => void;
  getSearchSuggestions: (query: string, products: SearchResult[]) => string[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const performSearch = (query: string, products: SearchResult[]) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    // Simulate search delay for better UX
    setTimeout(() => {
      const normalizedQuery = query.toLowerCase().trim();
      
      const results = products.filter(product => {
        const searchableText = [
          product.name,
          product.category,
          product.brand,
          product.description
        ].filter(Boolean).join(' ').toLowerCase();

        // Check for exact matches first
        if (product.name.toLowerCase().includes(normalizedQuery)) {
          return true;
        }

        // Check for category matches
        if (product.category?.toLowerCase().includes(normalizedQuery)) {
          return true;
        }

        // Check for brand matches
        if (product.brand?.toLowerCase().includes(normalizedQuery)) {
          return true;
        }

        // Check for partial word matches
        const queryWords = normalizedQuery.split(' ').filter(word => word.length > 2);
        return queryWords.some(word => searchableText.includes(word));
      });

      setSearchResults(results);
      setIsSearching(false);

      // Show toast notification
      if (results.length > 0) {
        toast({
          title: "Search Results",
          description: `Found ${results.length} product${results.length === 1 ? '' : 's'} for "${query}"`,
        });
      } else {
        toast({
          title: "No Results Found",
          description: `No products found for "${query}". Try different keywords.`,
          variant: "destructive",
        });
      }
    }, 300);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
    setIsSearching(false);
  };

  const getSearchSuggestions = (query: string, products: SearchResult[]): string[] => {
    if (!query.trim() || query.length < 2) return [];

    const normalizedQuery = query.toLowerCase().trim();
    const suggestions = new Set<string>();

    products.forEach(product => {
      // Add product names that start with the query
      if (product.name.toLowerCase().startsWith(normalizedQuery)) {
        suggestions.add(product.name);
      }

      // Add categories that start with the query
      if (product.category?.toLowerCase().startsWith(normalizedQuery)) {
        suggestions.add(product.category);
      }

      // Add brands that start with the query
      if (product.brand?.toLowerCase().startsWith(normalizedQuery)) {
        suggestions.add(product.brand);
      }
    });

    return Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
  };

  const value = {
    searchQuery,
    searchResults,
    isSearching,
    hasSearched,
    setSearchQuery,
    performSearch,
    clearSearch,
    getSearchSuggestions,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 