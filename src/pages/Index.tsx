import { ReactFlowProvider } from 'reactflow';
import { Layout } from '@/components/layout/Layout';
import { GraphCanvas } from '@/components/canvas/GraphCanvas';
import { RightPanel } from '@/components/panel/RightPanel';

const Index = () => {
  return (
    <ReactFlowProvider>
      <Layout>
        <GraphCanvas />
        <RightPanel />
      </Layout>
    </ReactFlowProvider>
  );
};

export default Index;
