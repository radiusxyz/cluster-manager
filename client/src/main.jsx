import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClustersProvider } from "./contexts/ClustersContext.jsx";

document.getElementById("root") &&
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ClustersProvider>
        <App />
      </ClustersProvider>
    </React.StrictMode>
  );
