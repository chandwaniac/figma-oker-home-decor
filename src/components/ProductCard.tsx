import { Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../data/products';
import clsx from 'clsx';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'compact';
}

export default function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {product.isNew && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-medium px-2 py-1 rounded">
            New
          </span>
        )}

        <div className="absolute bottom-2 right-2 flex gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
              isFavorite ? 'bg-white' : 'bg-white/90'
            )}
          >
            <Heart
              size={16}
              className={clsx(
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              )}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center"
          >
            <ShoppingBag size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-2.5">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-xs text-gray-500 font-medium">{product.brand}</span>
          {product.isLuxury && (
            <span className="text-[9px] bg-[#E8E4DE] text-gray-600 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" stroke="currentColor" strokeWidth="1" fill="none"/>
              </svg>
              Luxury
            </span>
          )}
        </div>

        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1.5 leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
