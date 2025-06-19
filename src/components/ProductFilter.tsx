
import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ProductFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ isOpen, onClose }) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isOpen3, setIsOpen3] = useState(true);
  const [isOpen4, setIsOpen4] = useState(true);

  const brands = ['Nike', 'Adidas', 'Puma', 'Under Armour', 'New Balance'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Red', 'Blue', 'Black', 'White', 'Green', 'Yellow'];

  const toggleSelection = (item: string, selectedItems: string[], setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 200]);
  };

  const activeFiltersCount = selectedBrands.length + selectedSizes.length + selectedColors.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-start">
      <div className="w-full max-w-sm bg-white h-full overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          {activeFiltersCount > 0 && (
            <div className="flex items-center justify-between mt-3">
              <Badge variant="secondary">
                {activeFiltersCount} active {activeFiltersCount === 1 ? 'filter' : 'filters'}
              </Badge>
              <Button variant="link" size="sm" onClick={clearAllFilters} className="text-blue-600 p-0">
                Clear all
              </Button>
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          {/* Price Range */}
          <Collapsible open={isOpen1} onOpenChange={setIsOpen1}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <h3 className="text-lg font-semibold text-gray-900">Price Range</h3>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen1 ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={200}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Brands */}
          <Collapsible open={isOpen2} onOpenChange={setIsOpen2}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <h3 className="text-lg font-semibold text-gray-900">Brands</h3>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen2 ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleSelection(brand, selectedBrands, setSelectedBrands)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {brand}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Sizes */}
          <Collapsible open={isOpen3} onOpenChange={setIsOpen3}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <h3 className="text-lg font-semibold text-gray-900">Sizes</h3>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen3 ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSizes.includes(size) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSelection(size, selectedSizes, setSelectedSizes)}
                    className={`${selectedSizes.includes(size) ? 'bg-blue-600 text-white' : ''}`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Colors */}
          <Collapsible open={isOpen4} onOpenChange={setIsOpen4}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <h3 className="text-lg font-semibold text-gray-900">Colors</h3>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen4 ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-3">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={selectedColors.includes(color)}
                    onCheckedChange={() => toggleSelection(color, selectedColors, setSelectedColors)}
                  />
                  <Label htmlFor={`color-${color}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                    <div 
                      className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
                        color.toLowerCase() === 'black' ? 'bg-black' :
                        color.toLowerCase() === 'white' ? 'bg-white border-gray-400' :
                        color.toLowerCase() === 'red' ? 'bg-red-500' :
                        color.toLowerCase() === 'blue' ? 'bg-blue-500' :
                        color.toLowerCase() === 'green' ? 'bg-green-500' :
                        color.toLowerCase() === 'yellow' ? 'bg-yellow-500' : 'bg-gray-300'
                      }`}
                    />
                    {color}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg"
              size="lg"
            >
              Apply Filters
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
