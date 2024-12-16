import React, { useState } from 'react';
import { Move } from 'lucide-react';

interface ImageUploaderProps {
  onChange: (data: { url: string; position: { x: number; y: number } }) => void;
  value?: { url: string; position: { x: number; y: number } };
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange, value }) => {
  const [position, setPosition] = useState(value?.position || { x: 50, y: 50 });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          url: reader.result as string,
          position,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePositionChange = (x: number, y: number) => {
    const newPosition = { x, y };
    setPosition(newPosition);
    if (value?.url) {
      onChange({ url: value.url, position: newPosition });
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-center">
          <Move className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-1">Click or drag image to upload</p>
        </div>
      </div>
      
      {value?.url && (
        <div className="space-y-2">
          <img src={value.url} alt="Preview" className="w-full rounded-lg" />
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">X Position</label>
              <input
                type="range"
                min="0"
                max="100"
                value={position.x}
                onChange={(e) => handlePositionChange(Number(e.target.value), position.y)}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Y Position</label>
              <input
                type="range"
                min="0"
                max="100"
                value={position.y}
                onChange={(e) => handlePositionChange(position.x, Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};