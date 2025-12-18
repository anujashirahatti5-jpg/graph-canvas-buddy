import { create } from 'zustand';
import type { Node, Edge } from 'reactflow';
import type { NodeData } from '@/api/mockApi';

export type InspectorTab = 'config' | 'runtime';

interface AppState {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;
  nodes: Node<NodeData>[];
  edges: Edge[];
  
  setSelectedAppId: (appId: string | null) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  clearSelection: () => void;
  setNodes: (nodes: Node<NodeData>[] | ((nodes: Node<NodeData>[]) => Node<NodeData>[])) => void;
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  updateNodeData: (nodeId: string, updates: Partial<NodeData>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  nodes: [],
  edges: [],
  
  setSelectedAppId: (appId) => set({ 
    selectedAppId: appId, 
    selectedNodeId: null,
    nodes: [],
    edges: [],
  }),
  
  setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),
  
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  
  clearSelection: () => set({ selectedNodeId: null }),
  
  setNodes: (nodesOrFn) => set((state) => ({
    nodes: typeof nodesOrFn === 'function' ? nodesOrFn(state.nodes) : nodesOrFn,
  })),
  
  setEdges: (edgesOrFn) => set((state) => ({
    edges: typeof edgesOrFn === 'function' ? edgesOrFn(state.edges) : edgesOrFn,
  })),
  
  updateNodeData: (nodeId, updates) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, ...updates } }
        : node
    ),
  })),
}));
