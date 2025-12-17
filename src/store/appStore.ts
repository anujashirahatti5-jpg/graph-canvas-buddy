import { create } from 'zustand';

export type InspectorTab = 'config' | 'runtime';

interface AppState {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;
  
  setSelectedAppId: (appId: string | null) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  clearSelection: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  
  setSelectedAppId: (appId) => set({ 
    selectedAppId: appId, 
    selectedNodeId: null 
  }),
  
  setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),
  
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  
  clearSelection: () => set({ 
    selectedNodeId: null 
  }),
}));
