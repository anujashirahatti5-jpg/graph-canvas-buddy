import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Server, Database, MessageSquare, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NodeData } from '@/api/mockApi';

const iconMap = {
  service: Server,
  database: Database,
  queue: MessageSquare,
  gateway: Globe,
};

const statusStyles = {
  healthy: 'bg-success',
  degraded: 'bg-warning',
  down: 'bg-destructive',
};

function CustomNodeComponent({ data, selected }: NodeProps<NodeData>) {
  const Icon = iconMap[data.type] || Server;
  
  return (
    <div className={cn('node-card', selected && 'selected')}>
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-muted-foreground !border-card !w-3 !h-3"
      />
      
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
        
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground truncate">
              {data.label}
            </span>
            <span 
              className={cn(
                'w-2 h-2 rounded-full flex-shrink-0',
                statusStyles[data.status]
              )}
            />
          </div>
          <p className="text-xs text-muted-foreground capitalize mt-0.5">
            {data.type}
          </p>
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-muted-foreground !border-card !w-3 !h-3"
      />
    </div>
  );
}

export const CustomNode = memo(CustomNodeComponent);
