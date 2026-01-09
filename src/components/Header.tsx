import { Bell } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showNotification?: boolean;
}

export default function Header({ title, showLogo = true, showNotification = true }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-white z-40 px-4 py-3 flex items-center justify-between border-b border-gray-100">
      {showLogo ? (
        <div className="flex items-center">
          <span className="text-xl font-bold text-[#F5A623]">oker</span>
        </div>
      ) : (
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      )}

      {showNotification && (
        <button className="relative p-1">
          <Bell size={22} className="text-gray-700" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#F5A623] rounded-full" />
        </button>
      )}
    </header>
  );
}
