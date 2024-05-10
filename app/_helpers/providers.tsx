"use client";
import { Provider as JotaiProvider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TheSheet } from "@/components/the-sheet/the-sheet";
import { TheDrawer } from "@/components/the-drawer/the-drawer";

const queryClient = new QueryClient();

function Providers({ children }: React.PropsWithChildren) {
  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-center" />
        <TheSheet />
        <TheDrawer />
      </QueryClientProvider>
    </JotaiProvider>
  );
}

export { Providers };
