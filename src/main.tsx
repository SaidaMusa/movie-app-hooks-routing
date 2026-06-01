import { StrictMode } from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  QueryClientProvider,
} from "@tanstack/react-query";

import "./index.css";

import App from "./App";

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

import {
  ThemeProvider,
} from "./context/ThemeContext";

import {
  queryClient,
} from "./lib/queryClient";

ReactDOM.createRoot(
  document.getElementById(
    "root"
  ) as HTMLElement
).render(
  <StrictMode>
    <QueryClientProvider
      client={queryClient}
    >
      <ThemeProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);