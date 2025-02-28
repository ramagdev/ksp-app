import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import "./index.css";
import AnimatedRoutes from "./AnimatedRoutes"; // Impor AnimatedRoutes

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <TransitionGroup>
        <AnimatedRoutes />
      </TransitionGroup>
    </HashRouter>
  </StrictMode>
);