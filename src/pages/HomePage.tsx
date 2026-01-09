import { useState } from 'react';
import Header from '../components/Header';
import TabSwitch from '../components/TabSwitch';
import FilterChips from '../components/FilterChips';
import ProductCard from '../components/ProductCard';
import InspirationCard from '../components/InspirationCard';
import BrandSpotlight from '../components/BrandSpotlight';
import { products, inspirationPosts, filters, brands } from '../data/products';
import { ChevronRight, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tabs = [
  { id: 'inspiration', label: 'Inspiration' },
  { id: 'shop', label: 'Shop' },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('shop');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="pb-20 bg-white min-h-screen">
      <Header />
      <div className="py-3">
        <TabSwitch tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className="h-px bg-gray-100" />
      {activeTab === 'inspiration' ? (
        <InspirationFeed />
      ) : (
        <ShopFeed activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      )}
    </div>
  );
}

function InspirationFeed() {
  return (
    <div className="px-4 py-4 space-y-4">
      {inspirationPosts.map((post) => (
        <InspirationCard key={post.id} post={post} />
      ))}
    </div>
  );
}

interface ShopFeedProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

function ShopFeed({ activeFilter, onFilterChange }: ShopFeedProps) {
  const navigate = useNavigate();

  return (
    <div>
      <BrandSpotlight
        title="Celebrate togetherness"
        subtitle="Your perfect blend of style and serenity"
        image="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=1000&fit=crop"
        brandName="Saphed"
      />
      <FilterChips filters={filters} activeFilter={activeFilter} onFilterChange={onFilterChange} />
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <section className="mt-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-base font-semibold text-gray-900">Shop by category</h2>
          <button className="text-sm text-gray-500 flex items-center">See all <ChevronRight size={16} /></button>
        </div>
        <div className="flex gap-4 px-4 overflow-x-auto hide-scrollbar pb-2">
          {['Rugs', 'Cushions', 'Decor', 'Lighting', 'Storage'].map((cat) => (
            <div key={cat} className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-[#F6F4F0] flex items-center justify-center text-2xl">
                {cat === 'Rugs' && '🏠'}{cat === 'Cushions' && '🛋️'}{cat === 'Decor' && '🌸'}{cat === 'Lighting' && '💡'}{cat === 'Storage' && '📦'}
              </div>
              <span className="text-xs text-gray-600">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-base font-semibold text-gray-900">Most loved brands</h2>
          <button className="text-sm text-gray-500 flex items-center">See all <ChevronRight size={16} /></button>
        </div>
        <div className="space-y-2 px-4">
          {brands.slice(0, 3).map((brand) => (
            <div key={brand.id} className="flex items-center justify-between py-2.5 cursor-pointer" onClick={() => navigate('/brand/' + brand.id)}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">{brand.logo}</div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-900">{brand.name}</span>
                    <BadgeCheck size={14} className="text-[#F5A623] fill-[#F5A623]" />
                  </div>
                  <p className="text-xs text-gray-500">{brand.description}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 mb-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-base font-semibold text-gray-900">Popular collections</h2>
          <button className="text-sm text-gray-500 flex items-center">See all <ChevronRight size={16} /></button>
        </div>
        <div className="flex gap-3 px-4 overflow-x-auto hide-scrollbar pb-2">
          {[
            { name: 'Boho Chic', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop' },
            { name: 'Minimalist', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200&h=200&fit=crop' },
            { name: 'Traditional', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200&h=200&fit=crop' },
            { name: 'Modern', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=200&h=200&fit=crop' },
          ].map((col) => (
            <div key={col.name} className="flex-shrink-0 w-32">
              <div className="aspect-square rounded-lg overflow-hidden mb-2">
                <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-medium text-gray-700">{col.name}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {products.slice(4, 12).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
