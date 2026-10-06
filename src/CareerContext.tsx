import { createContext, useContext, useState, type ReactNode } from "react";
import { experience } from "./background";

const CareerContext = createContext<{
  expanded: string | null;
  setExpanded: (company: string | null) => void;
  openExperience: (company: string) => void;
} | null>(null);

export function CareerProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState<string | null>(
    experience[0].company,
  );
  const openExperience = (company: string) => {
    setExpanded(company);
    // Allow the details to open before placing the relevant entry below the header.
    requestAnimationFrame(() => {
      const index = experience.findIndex((job) => job.company === company);
      const entry = document.getElementById(`career-entry-${index}`);
      const reduced =
        document.documentElement.dataset.motion === "off" ||
        matchMedia("(prefers-reduced-motion: reduce)").matches;
      entry?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      entry
        ?.querySelector<HTMLButtonElement>(".journey-toggle")
        ?.focus({ preventScroll: true });
    });
  };
  return (
    <CareerContext.Provider value={{ expanded, setExpanded, openExperience }}>
      {children}
    </CareerContext.Provider>
  );
}

export function useCareer() {
  const context = useContext(CareerContext);
  if (!context) throw new Error("Career controls require CareerProvider");
  return context;
}
