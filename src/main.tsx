import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { processQueue } from "./utils/processQueue.ts";

// Run every 5 seconds
setInterval(() => processQueue(), 5000);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
