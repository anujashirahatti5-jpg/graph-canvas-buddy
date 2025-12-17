import { useQuery } from '@tanstack/react-query';
import { fetchApps, fetchGraph, type App, type GraphData } from '@/api/mockApi';

export function useApps() {
  return useQuery<App[], Error>({
    queryKey: ['apps'],
    queryFn: fetchApps,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGraph(appId: string | null) {
  return useQuery<GraphData, Error>({
    queryKey: ['graph', appId],
    queryFn: () => fetchGraph(appId!),
    enabled: !!appId,
    staleTime: 2 * 60 * 1000,
  });
}
