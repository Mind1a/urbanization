import { dehydrate, HydrationBoundary, QueryClient, type QueryKey } from "@tanstack/react-query";

export default function ServerHydration({ children, queries }: {
  children: React.ReactNode;
  queries: { queryKey: QueryKey; data: unknown }[];
}) {
  // A new cache per render prevents data leaking between requests or languages.
  const queryClient = new QueryClient();
  for (const { queryKey, data } of queries) {
    if (data !== undefined) queryClient.setQueryData(queryKey, data);
  }
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
