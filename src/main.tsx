import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <BrowserRouter>
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <QueryClientProvider client={new QueryClient()}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
      
    </div>
    </BrowserRouter>
  </StrictMode>,
);
