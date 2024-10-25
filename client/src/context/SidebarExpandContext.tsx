import React, { useContext, useState, createContext } from "react";

interface SidebarExpandContextType {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarExpandContext = createContext<
  SidebarExpandContextType | undefined
>(undefined);

export const SidebarProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <SidebarExpandContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarExpandContext.Provider>
  );
};

export const useSidebarExpand = () => useContext(SidebarExpandContext);
