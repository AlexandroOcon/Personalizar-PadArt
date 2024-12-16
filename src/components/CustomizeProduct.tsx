import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import { ShoppingCart } from 'lucide-react';
import { ColorPicker } from './customization/ColorPicker';
import { ImageUploader } from './customization/ImageUploader';
import { CustomizationValues } from '../types';

export const CustomizeProduct: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === productId);
  const addToCart = useStore((state) => state.addToCart);

  const [customizations, setCustomizations] = useState<Record<string, any>>({});
  const [customValues, setCustomValues] = useState<CustomizationValues>({});

  if (!product) {
    return <div>Product not found</div>;
  }

  const calculateTotalPrice = () => {
    let total = product.basePrice;
    Object.entries(customizations).forEach(([optionType, selectedId]) => {
      const option = product.customizationOptions.find((opt) => opt.type === optionType);
      const selection = option?.options.find((opt) => opt.id === selectedId);
      if (selection) {
        total += selection.price;
      }
    });
    return total;
  };

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity: 1,
      customizations: { ...customizations, customValues },
      totalPrice: calculateTotalPrice(),
    });
    navigate('/cart');
  };

  const renderCustomizationOption = (option: any) => {
    const selectedId = customizations[option.type];

    if (selectedId === 'custom' && option.type === 'color') {
      return (
        <ColorPicker
          value={customValues.color || '#000000'}
          onChange={(color) => setCustomValues({ ...customValues, color })}
        />
      );
    }

    if (selectedId === 'custom' && option.type === 'keycaps') {
      return (
        <ColorPicker
          value={customValues.keycapsColor || '#000000'}
          onChange={(color) => setCustomValues({ ...customValues, keycapsColor: color })}
        />
      );
    }

    if (selectedId === 'custom' && option.type === 'image') {
      return (
        <ImageUploader
          value={customValues.image}
          onChange={(imageData) => setCustomValues({ ...customValues, image: imageData })}
        />
      );
    }

    return (
      <div className="grid grid-cols-2 gap-2">
        {option.options.map((choice: any) => (
          <button
            key={choice.id}
            className={`p-3 rounded-md border ${
              selectedId === choice.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() =>
              setCustomizations({
                ...customizations,
                [option.type]: choice.id,
              })
            }
          >
            <div className="font-medium">{choice.name}</div>
            {choice.price > 0 && (
              <div className="text-sm text-gray-600">
                +${choice.price.toFixed(2)}
              </div>
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
          {customValues.image && (
            <div className="mt-4 relative">
              <h3 className="text-lg font-semibold mb-2">Custom Design Preview</h3>
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={customValues.image.url}
                  alt="Custom design"
                  className="absolute w-full h-full object-cover"
                  style={{
                    objectPosition: `${customValues.image.position.x}% ${customValues.image.position.y}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {product.customizationOptions.map((option) => (
            <div key={option.type} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{option.name}</h3>
              {renderCustomizationOption(option)}
            </div>
          ))}

          <div className="mt-8">
            <div className="text-2xl font-bold mb-4">
              Total: ${calculateTotalPrice().toFixed(2)}
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};