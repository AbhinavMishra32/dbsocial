import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import React, { createContext, useContext, useState } from "react";
import { useUser } from "../context/UserContext";
import { SidebarContext } from "./Sidebar";

// interface SidebarContextType {
//   expanded: boolean;
// }

// const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarLayout = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const { user } = useUser();
  return (
    <>
      <aside className="flex h-full">
        <nav className="h-full flex flex-col bg-background border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                }`}
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-/gray-50 hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>
          <div className="border-t flex p-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.username
              )}&background=random`}
              alt=""
              className="w-10 h-10 rounded-md bg-red-400"
            />
            <div
              className={`
                        flex justify-between items-center
                        overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                }
                        `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Abhinav Mishra</h4>
                <span className="text-sx text-gray-600">
                  abhinav@abhinav.com
                </span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export const SidebarItem = ({ icon, text, active, alert }) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors duration-200
        ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
        }
        `}
    >
      {icon}
      <span
        className={` overflow-hidden transition-all
            ${expanded ? "w-52 ml-3" : "w-0"}`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute ${expanded ? "right-2" : "right-0 top-0"
            } w-2 h-2 rounded bg-indigo-400`}
        />
      )}
    </li>
  );
};
