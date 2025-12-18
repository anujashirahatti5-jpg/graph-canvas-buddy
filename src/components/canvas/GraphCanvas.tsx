import { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  BackgroundVariant,
  useReactFlow,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Loader2 } from 'lucide-react';
import { CustomNode } from './CustomNode';
import { useGraph } from '@/hooks/useApps';
import { useAppStore } from '@/store/appStore';
import type { NodeData } from '@/api/mockApi';

const nodeTypes = {
  custom: CustomNode,
};

export function GraphCanvas() {
  const { selectedAppId, selectedNodeId, setSelectedNodeId, nodes, edges, setNodes, setEdges } = useAppStore();
  const { data: graphData, isLoading, error } = useGraph(selectedAppId);
  const { fitView } = useReactFlow();
  
  useEffect(() => {
    if (graphData) {
      setNodes(graphData.nodes);
      setEdges(graphData.edges);
      setTimeout(() => fitView({ padding: 0.2 }), 100);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [graphData, setNodes, setEdges, fitView]);
  
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds) as Node<NodeData>[]);
    },
    [setNodes]
  );
  
  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );
  
  const handleSelectionChange = useCallback(
    ({ nodes: selectedNodes }: { nodes: Node[]; edges: Edge[] }) => {
      if (selectedNodes.length > 0) {
        setSelectedNodeId(selectedNodes[0].id);
      } else {
        setSelectedNodeId(null);
      }
    },
    [setSelectedNodeId]
  );
  
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNodeId) {
        setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
        setEdges((eds) => eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId));
        setSelectedNodeId(null);
      }
    },
    [selectedNodeId, setNodes, setEdges, setSelectedNodeId]
  );
  
  const defaultEdgeOptions = useMemo(
    () => ({
      style: { strokeWidth: 2 },
    }),
    []
  );
  
  if (!selectedAppId) {
    return (
      <div className="flex-1 canvas-container flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">No App Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select an app from the right panel to view its graph
          </p>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="flex-1 canvas-container flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Loading graph...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex-1 canvas-container flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">Error Loading Graph</h3>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 canvas-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onSelectionChange={handleSelectionChange}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(220 14% 18%)" />
        <Controls className="!bg-card !border-border !rounded-lg" />
        <MiniMap 
          nodeColor={() => 'hsl(210 100% 56%)'}
          maskColor="hsl(220 16% 10% / 0.8)"
          className="!bg-card !border-border"
        />
      </ReactFlow>
    </div>
  );
}
