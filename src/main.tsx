import { StrictMode, useRef } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./index.css";
import AnimatedRoutes from "./AnimatedRoutes";
import { AuthProvider } from "./utils/auth";
import App from "./App";
import { AppShell } from "./presentation/components/AppShell";
import { Routes, Route } from "react-router-dom";

const AnimatedContent = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        nodeRef={nodeRef}
        key={location.pathname}
        timeout={1000}
        classNames="page"
        unmountOnExit
      >
        <div ref={nodeRef}>
          <AnimatedRoutes />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

const AppWrapper = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/app/*" element={<AppShell />}>
        <Route path="*" element={<AnimatedContent />} />
      </Route>
    </Routes>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <HashRouter>
        <AppWrapper />
      </HashRouter>
    </AuthProvider>
  </StrictMode>
);