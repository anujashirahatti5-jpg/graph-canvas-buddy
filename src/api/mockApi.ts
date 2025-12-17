import { Node, Edge } from 'reactflow';

export interface App {
  id: string;
  name: string;
  description: string;
  status: 'healthy' | 'degraded' | 'down';
  nodeCount: number;
}

export interface NodeData {
  label: string;
  status: 'healthy' | 'degraded' | 'down';
  type: 'service' | 'database' | 'queue' | 'gateway';
  configValue: number;
  runtimeInfo: {
    uptime: string;
    memory: string;
    cpu: string;
  };
}

export interface GraphData {
  nodes: Node<NodeData>[];
  edges: Edge[];
}

const apps: App[] = [
  {
    id: 'app-1',
    name: 'E-Commerce Platform',
    description: 'Main shopping application',
    status: 'healthy',
    nodeCount: 4,
  },
  {
    id: 'app-2',
    name: 'Payment Gateway',
    description: 'Payment processing service',
    status: 'degraded',
    nodeCount: 3,
  },
  {
    id: 'app-3',
    name: 'Analytics Engine',
    description: 'Data analytics pipeline',
    status: 'healthy',
    nodeCount: 5,
  },
  {
    id: 'app-4',
    name: 'Auth Service',
    description: 'Authentication & authorization',
    status: 'down',
    nodeCount: 3,
  },
];

const graphData: Record<string, GraphData> = {
  'app-1': {
    nodes: [
      {
        id: 'node-1',
        type: 'custom',
        position: { x: 100, y: 100 },
        data: {
          label: 'API Gateway',
          status: 'healthy',
          type: 'gateway',
          configValue: 75,
          runtimeInfo: { uptime: '14d 6h', memory: '512MB', cpu: '12%' },
        },
      },
      {
        id: 'node-2',
        type: 'custom',
        position: { x: 350, y: 50 },
        data: {
          label: 'Product Service',
          status: 'healthy',
          type: 'service',
          configValue: 50,
          runtimeInfo: { uptime: '7d 12h', memory: '1.2GB', cpu: '34%' },
        },
      },
      {
        id: 'node-3',
        type: 'custom',
        position: { x: 350, y: 200 },
        data: {
          label: 'Order Service',
          status: 'healthy',
          type: 'service',
          configValue: 60,
          runtimeInfo: { uptime: '7d 12h', memory: '896MB', cpu: '28%' },
        },
      },
      {
        id: 'node-4',
        type: 'custom',
        position: { x: 600, y: 125 },
        data: {
          label: 'PostgreSQL',
          status: 'healthy',
          type: 'database',
          configValue: 80,
          runtimeInfo: { uptime: '30d 0h', memory: '4GB', cpu: '45%' },
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', animated: true },
      { id: 'e1-3', source: 'node-1', target: 'node-3', animated: true },
      { id: 'e2-4', source: 'node-2', target: 'node-4' },
      { id: 'e3-4', source: 'node-3', target: 'node-4' },
    ],
  },
  'app-2': {
    nodes: [
      {
        id: 'node-1',
        type: 'custom',
        position: { x: 100, y: 150 },
        data: {
          label: 'Payment API',
          status: 'degraded',
          type: 'gateway',
          configValue: 45,
          runtimeInfo: { uptime: '3d 8h', memory: '768MB', cpu: '67%' },
        },
      },
      {
        id: 'node-2',
        type: 'custom',
        position: { x: 350, y: 100 },
        data: {
          label: 'Transaction Processor',
          status: 'healthy',
          type: 'service',
          configValue: 90,
          runtimeInfo: { uptime: '5d 2h', memory: '2GB', cpu: '55%' },
        },
      },
      {
        id: 'node-3',
        type: 'custom',
        position: { x: 350, y: 250 },
        data: {
          label: 'Message Queue',
          status: 'degraded',
          type: 'queue',
          configValue: 30,
          runtimeInfo: { uptime: '1d 4h', memory: '1GB', cpu: '78%' },
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', animated: true },
      { id: 'e2-3', source: 'node-2', target: 'node-3' },
    ],
  },
  'app-3': {
    nodes: [
      {
        id: 'node-1',
        type: 'custom',
        position: { x: 50, y: 150 },
        data: {
          label: 'Data Ingestion',
          status: 'healthy',
          type: 'service',
          configValue: 85,
          runtimeInfo: { uptime: '21d 0h', memory: '3GB', cpu: '40%' },
        },
      },
      {
        id: 'node-2',
        type: 'custom',
        position: { x: 250, y: 50 },
        data: {
          label: 'Stream Processor',
          status: 'healthy',
          type: 'service',
          configValue: 70,
          runtimeInfo: { uptime: '14d 6h', memory: '4GB', cpu: '52%' },
        },
      },
      {
        id: 'node-3',
        type: 'custom',
        position: { x: 250, y: 250 },
        data: {
          label: 'Batch Processor',
          status: 'healthy',
          type: 'service',
          configValue: 65,
          runtimeInfo: { uptime: '14d 6h', memory: '8GB', cpu: '38%' },
        },
      },
      {
        id: 'node-4',
        type: 'custom',
        position: { x: 450, y: 150 },
        data: {
          label: 'Data Lake',
          status: 'healthy',
          type: 'database',
          configValue: 95,
          runtimeInfo: { uptime: '60d 0h', memory: '16GB', cpu: '25%' },
        },
      },
      {
        id: 'node-5',
        type: 'custom',
        position: { x: 650, y: 150 },
        data: {
          label: 'Dashboard API',
          status: 'healthy',
          type: 'gateway',
          configValue: 55,
          runtimeInfo: { uptime: '7d 0h', memory: '512MB', cpu: '15%' },
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', animated: true },
      { id: 'e1-3', source: 'node-1', target: 'node-3', animated: true },
      { id: 'e2-4', source: 'node-2', target: 'node-4' },
      { id: 'e3-4', source: 'node-3', target: 'node-4' },
      { id: 'e4-5', source: 'node-4', target: 'node-5' },
    ],
  },
  'app-4': {
    nodes: [
      {
        id: 'node-1',
        type: 'custom',
        position: { x: 100, y: 150 },
        data: {
          label: 'Auth Gateway',
          status: 'down',
          type: 'gateway',
          configValue: 0,
          runtimeInfo: { uptime: '0h', memory: '0MB', cpu: '0%' },
        },
      },
      {
        id: 'node-2',
        type: 'custom',
        position: { x: 350, y: 100 },
        data: {
          label: 'Token Service',
          status: 'down',
          type: 'service',
          configValue: 25,
          runtimeInfo: { uptime: '0h', memory: '0MB', cpu: '0%' },
        },
      },
      {
        id: 'node-3',
        type: 'custom',
        position: { x: 350, y: 250 },
        data: {
          label: 'User Database',
          status: 'healthy',
          type: 'database',
          configValue: 100,
          runtimeInfo: { uptime: '90d 0h', memory: '2GB', cpu: '10%' },
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2' },
      { id: 'e2-3', source: 'node-2', target: 'node-3' },
    ],
  },
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchApps(): Promise<App[]> {
  await delay(500 + Math.random() * 500);
  return [...apps];
}

export async function fetchGraph(appId: string): Promise<GraphData> {
  await delay(300 + Math.random() * 400);
  
  const graph = graphData[appId];
  if (!graph) {
    throw new Error(`Graph not found for app: ${appId}`);
  }
  
  return {
    nodes: graph.nodes.map(node => ({ ...node, data: { ...node.data } })),
    edges: [...graph.edges],
  };
}

export async function updateNodeData(
  appId: string,
  nodeId: string,
  updates: Partial<NodeData>
): Promise<NodeData> {
  await delay(200);
  
  const graph = graphData[appId];
  if (!graph) {
    throw new Error(`Graph not found for app: ${appId}`);
  }
  
  const node = graph.nodes.find(n => n.id === nodeId);
  if (!node) {
    throw new Error(`Node not found: ${nodeId}`);
  }
  
  Object.assign(node.data, updates);
  return { ...node.data };
}
