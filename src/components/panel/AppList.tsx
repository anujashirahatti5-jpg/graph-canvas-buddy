import { Loader2, Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApps } from '@/hooks/useApps';
import { useAppStore } from '@/store/appStore';
import type { App } from '@/api/mockApi';

const statusStyles = {
  healthy: 'status-healthy',
  degraded: 'status-degraded',
  down: 'status-down',
};

const statusLabels = {
  healthy: 'Healthy',
  degraded: 'Degraded',
  down: 'Down',
};

function AppItem({ app, isActive, onClick }: { app: App; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn('app-list-item w-full text-left', isActive && 'active')}
    >
      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
        <Box className="w-5 h-5 text-muted-foreground" />
      </div>
      
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-foreground truncate">
            {app.name}
          </span>
          <span className={cn('status-badge', statusStyles[app.status])}>
            {statusLabels[app.status]}
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          {app.description}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {app.nodeCount} nodes
        </p>
      </div>
    </button>
  );
}

export function AppList() {
  const { data: apps, isLoading, error } = useApps();
  const { selectedAppId, setSelectedAppId } = useAppStore();
  
  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-destructive">Failed to load apps</p>
      </div>
    );
  }
  
  if (!apps || apps.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground">No apps found</p>
      </div>
    );
  }
  
  return (
    <div className="p-3 space-y-2">
      {apps.map((app) => (
        <AppItem
          key={app.id}
          app={app}
          isActive={selectedAppId === app.id}
          onClick={() => setSelectedAppId(app.id)}
        />
      ))}
    </div>
  );
}
