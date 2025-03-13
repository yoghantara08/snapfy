"use client";

import React from "react";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";

import RainbowKit from "@/components/RainbowKit/RainbowKit";
import { persistor, store } from "@/redux/store";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RainbowKit>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </RainbowKit>
    </QueryClientProvider>
  );
}
