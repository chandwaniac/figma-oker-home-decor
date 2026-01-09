import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

interface NavItem {
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  label: string;
  path: string;
  badge?: number;
}

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    {
      icon: <Home size={24} strokeWidth={1.5} />,
      activeIcon: <Home size={24} strokeWidth={2} fill="currentColor" />,
      label: 'Home',
      path: '/',
    },
    {
      icon: <Search size={24} strokeWidth={1.5} />,
      activeIcon: <Search size={24} strokeWidth={2} />,
      label: 'Search',
      path: '/search',
    },
    {
      icon: <Heart size={24} strokeWidth={1.5} />,
      activeIcon: <Heart size={24} strokeWidth={2} fill="currentColor" />,
      label: 'Favourites',
      path: '/favourites',
    },
    {
      icon: <ShoppingCart size={24} strokeWidth={1.5} />,
      activeIcon: <ShoppingCart size={24} strokeWidth={2} fill="currentColor" />,
      label: 'Cart',
      path: '/cart',
      badge: 1,
    },
    {
      icon: <User size={24} strokeWidth={1.5} />,
      activeIcon: <User size={24} strokeWidth={2} fill="currentColor" />,
      label: 'Profile',
      path: '/profile',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname.startsWith('/home');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 z-50">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={clsx(
                'flex flex-col items-center justify-center min-w-[64px] py-1.5 transition-colors relative',
                active ? 'text-black' : 'text-gray-400'
              )}
            >
              <div className="relative">
                {active ? item.activeIcon : item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F5A623] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={clsx(
                'text-[10px] mt-1',
                active ? 'font-medium' : 'font-normal'
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
