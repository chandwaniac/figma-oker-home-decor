import { ArrowLeft, ChevronRight, User, Package, MapPin, CreditCard, Bell, HelpCircle, LogOut, Settings, Heart, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: Package, label: 'My Orders', path: '/orders' },
  { icon: Heart, label: 'Wishlist', path: '/favourites' },
  { icon: MapPin, label: 'Saved Addresses', path: '/addresses' },
  { icon: CreditCard, label: 'Payment Methods', path: '/payments' },
  { icon: Gift, label: 'Refer & Earn', path: '/refer' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', path: '/help' },
];

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-white z-40 px-4 py-3 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-900 text-center">Profile</h1>
      </header>

      {/* User Info */}
      <div className="px-4 py-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#F6F4F0] flex items-center justify-center">
            <User size={32} className="text-gray-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">Guest User</h2>
            <p className="text-sm text-gray-500">Sign in for a personalized experience</p>
          </div>
        </div>
        <button className="w-full mt-4 bg-[#F5A623] text-black font-medium py-3 rounded-full">
          Sign in / Create account
        </button>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <item.icon size={22} className="text-gray-600" />
              <span className="text-sm text-gray-900">{item.label}</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        ))}
      </div>

      {/* App Version */}
      <div className="px-4 py-6 border-t border-gray-100 mt-4">
        <p className="text-xs text-gray-400 text-center">Version 1.0.0</p>
      </div>
    </div>
  );
}
