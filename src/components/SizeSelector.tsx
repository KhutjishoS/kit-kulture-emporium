import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, HelpCircle } from 'lucide-react';

interface SizeSelectorProps {
  sizes: string[];
  availableSizes: string[];
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
  className?: string;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  availableSizes,
  selectedSize,
  onSizeSelect,
  className = ''
}) => {
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const isSizeAvailable = (size: string) => {
    return availableSizes.includes(size);
  };

  const getSizeButtonVariant = (size: string) => {
    if (selectedSize === size) {
      return 'default';
    }
    return 'outline';
  };

  const getSizeButtonClassName = (size: string) => {
    const baseClasses = 'min-w-[60px] h-10 text-sm font-medium transition-all duration-200';
    
    if (selectedSize === size) {
      return `${baseClasses} bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-md`;
    }
    
    return `${baseClasses} hover:bg-gray-100 hover:border-gray-400 bg-white`;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900">Select Size</h4>
        <button
          onClick={() => setShowSizeGuide(!showSizeGuide)}
          className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <HelpCircle className="w-3 h-3" />
          Size Guide
        </button>
      </div>

      {/* Size Buttons */}
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <Button
            key={size}
            variant={getSizeButtonVariant(size)}
            className={getSizeButtonClassName(size)}
            onClick={() => onSizeSelect(size)}
          >
            {size}
          </Button>
        ))}
      </div>

      {/* Size Guide */}
      {showSizeGuide && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <h5 className="text-sm font-semibold text-gray-900">Size Guide</h5>
          </div>
          <div className="text-xs text-gray-700 space-y-3">
            <div>
              <strong className="text-gray-900">Hats & Caps:</strong>
              <div className="mt-1 grid grid-cols-1 gap-1">
                <div className="flex justify-between">
                  <span>S/M</span>
                  <span className="text-gray-600">Small to Medium</span>
                </div>
                <div className="flex justify-between">
                  <span>L/XL</span>
                  <span className="text-gray-600">Large to Extra Large</span>
                </div>
                <div className="flex justify-between">
                  <span>One Size</span>
                  <span className="text-gray-600">Fits Most</span>
                </div>
              </div>
            </div>
            <div>
              <strong className="text-gray-900">Clothing:</strong>
              <div className="mt-1 grid grid-cols-2 gap-1">
                <div className="flex justify-between">
                  <span>XS</span>
                  <span className="text-gray-600">Extra Small</span>
                </div>
                <div className="flex justify-between">
                  <span>S</span>
                  <span className="text-gray-600">Small</span>
                </div>
                <div className="flex justify-between">
                  <span>M</span>
                  <span className="text-gray-600">Medium</span>
                </div>
                <div className="flex justify-between">
                  <span>L</span>
                  <span className="text-gray-600">Large</span>
                </div>
                <div className="flex justify-between">
                  <span>XL</span>
                  <span className="text-gray-600">Extra Large</span>
                </div>
                <div className="flex justify-between">
                  <span>XXL</span>
                  <span className="text-gray-600">2X Large</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-blue-200">
              <p className="text-blue-700 text-xs">
                Need help? Contact us for personalized sizing assistance.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selected Size Display */}
      {selectedSize && (
        <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-md">
          <Badge variant="secondary" className="bg-green-100 text-green-800 font-medium">
            ✓ Selected: {selectedSize}
          </Badge>
        </div>
      )}

      {/* Helpful Tip */}
      {!selectedSize && (
        <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          <span className="text-xs text-blue-700">
            Please select a size to add this item to your cart
          </span>
        </div>
      )}
    </div>
  );
};

export default SizeSelector; 