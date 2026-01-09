import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, ChevronDown, ChevronUp, Star, Minus, Plus, Check, BadgeCheck, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import clsx from 'clsx';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Accordion states
  const [expandedSection, setExpandedSection] = useState<string | null>('details');

  const images = product.images || [product.image];
  const colors = product.colors || [{ name: 'Default', image: product.image }];
  const sizes = product.sizes || ['Standard'];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const similarProducts = products.filter((p) => p.id !== product.id).slice(0, 6);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-white z-50 px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <div className="flex-1 text-center px-4">
          <p className="text-xs text-gray-500">{product.brand}</p>
          <h1 className="text-sm font-medium text-gray-900 truncate">{product.name}</h1>
        </div>
        <button className="p-1">
          <Share2 size={22} className="text-gray-700" />
        </button>
      </header>

      {/* Image Carousel */}
      <div className="relative">
        <div className="aspect-square bg-gray-100">
          <img
            src={images[selectedImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* New Badge */}
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-3 py-1.5 rounded">
            New
          </span>
        )}

        {/* Image Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={clsx(
                'w-2 h-2 rounded-full transition-colors',
                index === selectedImageIndex ? 'bg-gray-800' : 'bg-gray-300'
              )}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <ShoppingBag size={18} className="text-gray-700" />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <Heart
              size={18}
              className={clsx(
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
              )}
            />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 py-4">
        {/* Brand Info */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
              {product.brandLogo || product.brand.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-900">{product.brand}</span>
                <BadgeCheck size={14} className="text-[#F5A623] fill-[#F5A623]" />
              </div>
              <p className="text-xs text-gray-500">
                {product.madeIn && `Made in ${product.madeIn}`}
                {product.tags?.length && ` · ${product.tags[0]}`}
              </p>
            </div>
          </div>
          {product.isLuxury && (
            <span className="text-xs bg-[#E8E4DE] text-gray-600 px-2 py-1 rounded flex items-center gap-1">
              <Star size={12} className="fill-current" />
              Luxury
            </span>
          )}
        </div>

        {/* Product Name & Price */}
        <h2 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h2>
        <p className="text-xl font-semibold text-gray-900 mb-4">{formatPrice(product.price)}</p>

        {/* Coupon Banner */}
        <div className="bg-[#F5E6F0] rounded-lg px-4 py-3 flex items-center justify-between mb-5">
          <span className="text-sm text-gray-700">First time order? Get 5% off!</span>
          <button className="text-sm font-semibold text-gray-900">Copy coupon</button>
        </div>

        {/* Color Selector */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-900">Colour</span>
            <span className="text-sm text-gray-500">{colors[selectedColor].name}</span>
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(index)}
                className={clsx(
                  'flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors',
                  index === selectedColor ? 'border-black' : 'border-transparent'
                )}
              >
                <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Size Selector */}
        {sizes.length > 1 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">Size</span>
              <span className="text-sm text-gray-500">{sizes[selectedSize]}</span>
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(index)}
                  className={clsx(
                    'flex-shrink-0 px-4 py-2 rounded-lg border text-sm transition-colors',
                    index === selectedSize
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 text-gray-700'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="mb-6">
          <span className="text-sm font-medium text-gray-900 mb-3 block">Quantity</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
            >
              <Minus size={18} className="text-gray-600" />
            </button>
            <span className="text-lg font-medium w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
            >
              <Plus size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-0 border-t border-gray-100">
          {/* Product Details */}
          <div className="border-b border-gray-100">
            <button
              onClick={() => toggleSection('details')}
              className="w-full flex items-center justify-between py-4"
            >
              <span className="text-sm font-medium text-gray-900">Product details</span>
              {expandedSection === 'details' ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </button>
            {expandedSection === 'details' && product.details && (
              <div className="pb-4 space-y-3">
                {/* Feature Icons */}
                <div className="flex gap-4 mb-4 overflow-x-auto hide-scrollbar">
                  {['Responsible', 'Handmade', 'Pet friendly'].map((feature) => (
                    <div key={feature} className="flex flex-col items-center gap-1.5">
                      <div className="w-12 h-12 rounded-full bg-[#F5E6E8] flex items-center justify-center">
                        <span className="text-lg">
                          {feature === 'Responsible' && '✨'}
                          {feature === 'Handmade' && '✋'}
                          {feature === 'Pet friendly' && '%'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3">
                  {product.details.dimensions && (
                    <div>
                      <p className="text-xs text-gray-400">Dimensions</p>
                      <p className="text-sm text-gray-700">{product.details.dimensions}</p>
                    </div>
                  )}
                  {product.details.packContents && (
                    <div>
                      <p className="text-xs text-gray-400">Pack contents</p>
                      <p className="text-sm text-gray-700 whitespace-pre-line">{product.details.packContents}</p>
                    </div>
                  )}
                  {product.details.colour && (
                    <div>
                      <p className="text-xs text-gray-400">Colour</p>
                      <p className="text-sm text-gray-700">{product.details.colour}</p>
                    </div>
                  )}
                  {product.details.aestheticStyle && (
                    <div>
                      <p className="text-xs text-gray-400">Aesthetic style</p>
                      <p className="text-sm text-gray-700">{product.details.aestheticStyle}</p>
                    </div>
                  )}
                  {product.details.material && (
                    <div>
                      <p className="text-xs text-gray-400">Material</p>
                      <p className="text-sm text-gray-700">{product.details.material}</p>
                    </div>
                  )}
                  {product.details.pattern && (
                    <div>
                      <p className="text-xs text-gray-400">Pattern</p>
                      <p className="text-sm text-gray-700">{product.details.pattern}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Shipping & Delivery */}
          <div className="border-b border-gray-100">
            <button
              onClick={() => toggleSection('shipping')}
              className="w-full flex items-center justify-between py-4"
            >
              <span className="text-sm font-medium text-gray-900">Shipping and delivery</span>
              {expandedSection === 'shipping' ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </button>
            {expandedSection === 'shipping' && (
              <div className="pb-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Check size={16} className="text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700">Usually ships in 5-7 days (Metro cities shipping included for orders above Rs 1500)</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">More information</p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={14} className="text-gray-400" />
                      Return and exchange possible
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={14} className="text-gray-400" />
                      COD available
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="border-b border-gray-100">
            <button
              onClick={() => toggleSection('reviews')}
              className="w-full flex items-center justify-between py-4"
            >
              <span className="text-sm font-medium text-gray-900">Reviews</span>
              {expandedSection === 'reviews' ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </button>
            {expandedSection === 'reviews' && (
              <div className="pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={clsx(
                          star <= Math.floor(product.rating || 4)
                            ? 'fill-[#F5A623] text-[#F5A623]'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating || 4.5} ({product.reviewCount || 128} reviews)
                  </span>
                </div>
                <button className="text-sm font-medium text-[#F5A623]">
                  See all reviews
                </button>
              </div>
            )}
          </div>
        </div>

        {/* View Similar Section */}
        <section className="mt-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">View similar</h3>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {similarProducts.map((p) => (
              <div key={p.id} className="flex-shrink-0 w-36">
                <ProductCard product={p} variant="compact" />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Fixed Add to Cart Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white px-4 py-3 border-t border-gray-100 z-50">
        <button
          onClick={handleAddToCart}
          className={clsx(
            'w-full py-4 rounded-full text-base font-semibold transition-all flex items-center justify-center gap-2',
            isAddedToCart
              ? 'bg-[#F5A623] text-black'
              : 'bg-[#F5A623] text-black'
          )}
        >
          {isAddedToCart ? (
            <>
              <Check size={20} />
              Added to cart
            </>
          ) : (
            'Add to cart'
          )}
        </button>
      </div>
    </div>
  );
}
