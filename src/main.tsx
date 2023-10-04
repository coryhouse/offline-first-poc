import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { processQueue } from "./utils/processQueue.ts";

setInterval(() => processQueue(), 5000); // Process the queue every 5 seconds

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
