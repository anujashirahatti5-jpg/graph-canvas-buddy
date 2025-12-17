import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AppList } from './AppList';
import { NodeInspector } from './NodeInspector';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

function PanelContent() {
  return (
    <>
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
    </>
  );
}

export function RightPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <div className="flex flex-shrink-0 h-full">
      {/* Toggle button */}
      <div className="flex items-start pt-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-6 rounded-l-lg rounded-r-none border border-r-0 border-border bg-card hover:bg-accent"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
      
      {/* Panel content */}
      <aside 
        className={cn(
          'bg-card border-l border-border flex flex-col overflow-hidden transition-all duration-300',
          isCollapsed ? 'w-0 border-l-0' : 'w-72 sm:w-80'
        )}
      >
        <ScrollArea className="flex-1">
          <PanelContent />
        </ScrollArea>
      </aside>
    </div>
  );
}
