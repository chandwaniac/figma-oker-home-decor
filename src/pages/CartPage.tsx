import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { products } from '../data/products';

const initialCartItems = [
  { product: products[0], quantity: 1, selectedSize: '5x8 ft', selectedColor: 'Ebony Slate' },
  { product: products[1], quantity: 2, selectedSize: 'Standard', selectedColor: 'Natural' },
];

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  const updateQuantity = (index: number, delta: number) => setCartItems((items) => items.map((item, i) => i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const removeItem = (index: number) => setCartItems((items) => items.filter((_, i) => i !== index));

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 1500 ? 0 : 99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="bg-white min-h-screen pb-20">
        <header className="sticky top-0 bg-white z-40 px-4 py-3 flex items-center border-b border-gray-100">
          <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft size={24} className="text-gray-800" /></button>
          <h1 className="flex-1 text-lg font-semibold text-gray-900 text-center pr-8">Cart</h1>
        </header>
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-4xl">🛒</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-sm text-gray-500 text-center mb-6">Browse our products and add items to your cart</p>
          <button onClick={() => navigate('/')} className="bg-[#F5A623] text-black font-medium px-8 py-3 rounded-full">Start shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-40">
      <header className="sticky top-0 bg-white z-40 px-4 py-3 flex items-center border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft size={24} className="text-gray-800" /></button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900 text-center pr-8">Cart ({cartItems.length})</h1>
      </header>

      <div className="px-4 py-4 space-y-4">
        {cartItems.map((item, index) => (
          <div key={index} className="flex gap-4 pb-4 border-b border-gray-100">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer" onClick={() => navigate(`/product/${item.product.id}`)}>
              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-xs text-gray-500">{item.product.brand}</p>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.product.name}</h3>
                </div>
                <button onClick={() => removeItem(index)} className="p-1 text-gray-400"><Trash2 size={18} /></button>
              </div>
              <p className="text-xs text-gray-500 mb-2">{item.selectedColor} | {item.selectedSize}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">{formatPrice(item.product.price)}</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(index, -1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"><Minus size={14} className="text-gray-600" /></button>
                  <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(index, 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"><Plus size={14} className="text-gray-600" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input type="text" placeholder="Enter coupon code" className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20" />
          <button className="px-5 py-3 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">Apply</button>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 px-4 py-4 z-50">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="text-gray-900">{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-600">Shipping</span><span className="text-gray-900">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
          <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-100"><span className="text-gray-900">Total</span><span className="text-gray-900">{formatPrice(total)}</span></div>
        </div>
        <button className="w-full bg-[#F5A623] text-black font-semibold py-4 rounded-full">Proceed to checkout</button>
      </div>
    </div>
  );
}
