import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import TabSwitch from '../components/TabSwitch';
import { products, brands } from '../data/products';
import { Heart, Grid, List, BadgeCheck, ChevronRight } from 'lucide-react';

const tabs = [{ id: 'products', label: 'Products' }, { id: 'collections', label: 'Collections' }];
const favouriteProducts = products.slice(0, 6).map((p) => ({ ...p, isFavorite: true }));
const collections = [
  { id: '1', name: 'Living room inspo', itemCount: 12, coverImages: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200&h=200&fit=crop'] },
  { id: '2', name: 'Bedroom makeover', itemCount: 8, coverImages: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop'] },
  { id: '3', name: 'Gift ideas', itemCount: 5, coverImages: ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=200&h=200&fit=crop'] },
];

export default function FavouritesPage() {
  const [activeTab, setActiveTab] = useState('products');
  return (
    <div className="bg-white min-h-screen pb-20">
      <header className="sticky top-0 bg-white z-40 px-4 py-3 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-900 text-center">Favourites</h1>
      </header>
      <div className="py-3"><TabSwitch tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} /></div>
      <div className="h-px bg-gray-100" />
      {activeTab === 'products' ? <ProductsTab /> : <CollectionsTab />}
    </div>
  );
}

function ProductsTab() {
  if (favouriteProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4"><Heart size={40} className="text-gray-300" /></div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No favourites yet</h3>
        <p className="text-sm text-gray-500 text-center">Save items you love by tapping the heart icon</p>
      </div>
    );
  }
  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{favouriteProducts.length} items</p>
        <div className="flex gap-2">
          <button className="p-1.5 bg-black rounded"><Grid size={18} className="text-white" /></button>
          <button className="p-1.5 bg-gray-100 rounded"><List size={18} className="text-gray-600" /></button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {favouriteProducts.map((product) => (<ProductCard key={product.id} product={product} />))}
      </div>
    </div>
  );
}

function CollectionsTab() {
  return (
    <div className="px-4 py-4">
      <button className="w-full flex items-center justify-center gap-2 py-3 mb-4 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600">
        <span className="text-lg">+</span>Create new collection
      </button>
      <div className="space-y-4">
        {collections.map((col) => (
          <div key={col.id} className="flex items-center gap-3 cursor-pointer">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 relative">
              <img src={col.coverImages[0]} alt={col.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">{col.name}</h3>
              <p className="text-xs text-gray-500">{col.itemCount} items</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Brands you follow</h2>
        <div className="space-y-3">
          {brands.slice(0, 3).map((brand) => (
            <div key={brand.id} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">{brand.logo}</div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-900">{brand.name}</span>
                  <BadgeCheck size={14} className="text-[#F5A623] fill-[#F5A623]" />
                </div>
                <p className="text-xs text-gray-500">{brand.description}</p>
              </div>
              <button className="px-3 py-1.5 border border-gray-200 rounded-full text-xs font-medium text-gray-700">Following</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
