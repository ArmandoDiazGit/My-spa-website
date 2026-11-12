import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Bookings are not idempotent; retrying a POST could create duplicates.
      retry: 0,
    },
  },
});

export function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
