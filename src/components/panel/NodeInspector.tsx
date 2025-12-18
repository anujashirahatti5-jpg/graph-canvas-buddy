import { useCallback, useMemo } from 'react';
import { Server, Database, MessageSquare, Globe, Clock, Cpu, HardDrive } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

const iconMap = {
  service: Server,
  database: Database,
  queue: MessageSquare,
  gateway: Globe,
};

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

export function NodeInspector() {
  const { selectedNodeId, nodes, activeInspectorTab, setActiveInspectorTab, updateNodeData } = useAppStore();
  
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return nodes.find((n) => n.id === selectedNodeId);
  }, [nodes, selectedNodeId]);
  
  const nodeData = selectedNode?.data;
  const Icon = nodeData ? iconMap[nodeData.type] || Server : Server;
  
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (selectedNodeId) {
        updateNodeData(selectedNodeId, { label: e.target.value });
      }
    },
    [selectedNodeId, updateNodeData]
  );
  
  const handleSliderChange = useCallback(
    (value: number[]) => {
      if (selectedNodeId) {
        updateNodeData(selectedNodeId, { configValue: value[0] });
      }
    },
    [selectedNodeId, updateNodeData]
  );
  
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (selectedNodeId) {
        const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
        updateNodeData(selectedNodeId, { configValue: value });
      }
    },
    [selectedNodeId, updateNodeData]
  );
  
  if (!selectedNodeId || !nodeData) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-48">
        <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 9h6M9 15h6M9 12h6" />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Select a node to inspect
        </p>
      </div>
    );
  }
  
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {nodeData.label}
          </h3>
          <p className="text-xs text-muted-foreground capitalize">
            {nodeData.type}
          </p>
          <span className={cn('status-badge mt-2', statusStyles[nodeData.status])}>
            {statusLabels[nodeData.status]}
          </span>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs value={activeInspectorTab} onValueChange={(v) => setActiveInspectorTab(v as 'config' | 'runtime')}>
        <TabsList className="w-full">
          <TabsTrigger value="config" className="flex-1">Config</TabsTrigger>
          <TabsTrigger value="runtime" className="flex-1">Runtime</TabsTrigger>
        </TabsList>
        
        <TabsContent value="config" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="node-name" className="text-xs text-muted-foreground">
              Node Name
            </Label>
            <Input
              id="node-name"
              value={nodeData.label}
              onChange={handleNameChange}
              className="h-9 text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">
                Config Value
              </Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={nodeData.configValue}
                onChange={handleInputChange}
                className="h-7 w-16 text-xs text-center"
              />
            </div>
            <Slider
              value={[nodeData.configValue]}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="runtime" className="mt-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Uptime</p>
                <p className="text-sm font-medium text-foreground">
                  {nodeData.runtimeInfo.uptime}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <HardDrive className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Memory</p>
                <p className="text-sm font-medium text-foreground">
                  {nodeData.runtimeInfo.memory}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Cpu className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">CPU Usage</p>
                <p className="text-sm font-medium text-foreground">
                  {nodeData.runtimeInfo.cpu}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
