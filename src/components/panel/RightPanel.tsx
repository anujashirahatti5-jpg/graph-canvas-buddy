import { X, PanelRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import { AppList } from './AppList';
import { NodeInspector } from './NodeInspector';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export function RightPanel() {
  const { isMobilePanelOpen, setMobilePanelOpen } = useAppStore();
  
  return (
    <>
      {/* Mobile overlay */}
      {isMobilePanelOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobilePanelOpen(false)}
        />
      )}
      
      {/* Panel */}
      <aside
        className={cn(
          'w-80 bg-card border-l border-border flex flex-col',
          'fixed right-0 top-14 bottom-0 z-50 lg:relative lg:top-0',
          'transition-transform duration-300 ease-out',
          isMobilePanelOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between p-3 border-b border-border lg:hidden">
          <span className="text-sm font-medium text-foreground">Panel</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobilePanelOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1">
          {/* Apps section */}
          <div>
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Applications
              </h2>
            </div>
            <AppList />
          </div>
          
          <Separator />
          
          {/* Inspector section */}
          <div>
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Node Inspector
              </h2>
            </div>
            <NodeInspector />
          </div>
        </ScrollArea>
      </aside>
      
      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed right-4 bottom-4 z-30 lg:hidden shadow-lg"
        onClick={() => setMobilePanelOpen(true)}
      >
        <PanelRight className="w-4 h-4" />
      </Button>
    </>
  );
}
