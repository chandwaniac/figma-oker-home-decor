import clsx from 'clsx';

interface Tab {
  id: string;
  label: string;
}

interface TabSwitchProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabSwitch({ tabs, activeTab, onTabChange }: TabSwitchProps) {
  return (
    <div className="bg-[#F6F4F0] rounded-full p-1 flex mx-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            'flex-1 py-2 px-4 text-sm font-medium rounded-full transition-all duration-200',
            activeTab === tab.id
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
