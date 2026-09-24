import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <QueryClientProvider client={new QueryClient()}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>

    </div>
  </StrictMode>,
);
