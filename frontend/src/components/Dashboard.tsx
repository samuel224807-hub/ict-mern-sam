import { Moon, Sun, Book } from 'lucide-react';
import { Switch } from './ui/switch';

interface DashboardProps {
  totalBooks: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Dashboard({ totalBooks, isDarkMode, onToggleDarkMode }: DashboardProps) {
  return (
    <div className="bg-[#3b5998] dark:bg-[#2c3e50] text-white py-6 px-6 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Book className="w-8 h-8" />
            <h1 className="text-3xl">Book Inventory</h1>
          </div>
          <div className="flex items-center gap-3">
            <Sun className="w-4 h-4" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={onToggleDarkMode}
              className="data-[state=checked]:bg-[#8b9dc3]"
            />
            <Moon className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#dfe3ee]">
          <span className="text-sm">Total Books:</span>
          <span className="bg-white/20 px-3 py-1 rounded-lg">{totalBooks}</span>
        </div>
      </div>
    </div>
  );
}
