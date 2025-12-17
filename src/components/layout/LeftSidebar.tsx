import { Home, Layers, Activity, Database, FileCode, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Layers, label: 'Apps', active: false },
  { icon: Activity, label: 'Monitoring', active: false },
  { icon: Database, label: 'Data', active: false },
  { icon: FileCode, label: 'Logs', active: false },
];

export function LeftSidebar() {
  return (
    <aside className="w-14 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-2">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={cn(
            'sidebar-icon',
            item.active && 'active'
          )}
          title={item.label}
        >
          <item.icon className="w-5 h-5" />
        </button>
      ))}
      
      <div className="mt-auto">
        <button className="sidebar-icon" title="Settings">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}
