import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import App from "./App";
import { CareerProvider } from "./CareerContext";
import "./styles.css";
import "./immersive.css";
import "./journey.css";
import "./materials.css";
import "./motion.css";
import "./interaction-polish.css";
import "./experience.css";
import "./lab-layout.css";
import "./broad-experience.css";
import "./refinement.css";
import "./public-work.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CareerProvider>
      <App />
    </CareerProvider>
  </React.StrictMode>,
);
