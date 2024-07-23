import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClustersProvider } from "./contexts/ClustersContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config } from "./config.js";

import { WagmiProvider } from "wagmi";
const queryClient = new QueryClient();

document.getElementById("root") &&
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ClustersProvider>
            <App />
          </ClustersProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
