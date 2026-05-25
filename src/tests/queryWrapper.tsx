import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

export function createWrapper() {
  const queryClient =
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

  return function Wrapper({
    children,
  }: Props) {
    return (
      <QueryClientProvider
        client={queryClient}
      >
        {children}
      </QueryClientProvider>
    );
  };
}