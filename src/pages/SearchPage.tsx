import { useState } from 'react';
import { Search, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, brands } from '../data/products';

const recentSearches = ['Home decor', 'Candles', 'Boho', 'Wall mirror', 'Ceramics', 'Ellementry'];
const popularCategories = [
  { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
  { id: 'kids-room', name: 'Kids room', icon: '🎈' },
  { id: 'dining-room', name: 'Dining room', icon: '🍽️' },
  { id: 'living-room', name: 'Living room', icon: '🛋️' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = query.length > 0
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleClearSearch = () => {
    setQuery('');
    setIsSearching(false);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="sticky top-0 bg-white z-40 px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {isSearching && (
            <button onClick={() => { setIsSearching(false); setQuery(''); }}>
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
          )}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setIsSearching(true); }}
              onFocus={() => setIsSearching(true)}
              placeholder="Search for anything"
              className="w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20"
            />
            {query && (
              <button onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X size={18} className="text-gray-400" />
              </button>
            )}
          </div>
          {isSearching && <button onClick={handleClearSearch} className="text-sm text-gray-600">Cancel</button>}
        </div>
      </div>

      {query.length > 0 && filteredProducts.length > 0 ? (
        <div className="px-4 py-4">
          <p className="text-sm text-gray-500 mb-3">{filteredProducts.length} results</p>
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (<ProductCard key={product.id} product={product} />))}
          </div>
        </div>
      ) : query.length > 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search size={48} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results for "{query}"</h3>
          <p className="text-sm text-gray-500 text-center">Try checking spelling or using different keywords.</p>
        </div>
      ) : (
        <>
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-900">Recent searches</h2>
              <button className="text-sm text-gray-500">Clear all</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <button key={search} onClick={() => setQuery(search)} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">{search}</button>
              ))}
            </div>
          </div>
          <div className="px-4 py-4 border-t border-gray-100">
            <h2 className="text-sm font-medium text-gray-900 mb-3">Popular categories</h2>
            <div className="grid grid-cols-2 gap-3">
              {popularCategories.map((cat) => (
                <button key={cat.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-left" onClick={() => navigate('/category/' + cat.id)}>
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 py-4 border-t border-gray-100">
            <h2 className="text-sm font-medium text-gray-900 mb-3">Most loved brands</h2>
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/brand/' + brand.id)}>
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-500">{brand.logo}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{brand.name}</p>
                    <p className="text-xs text-gray-500">{brand.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
