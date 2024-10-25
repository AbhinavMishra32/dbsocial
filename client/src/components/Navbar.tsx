import { useSidebarExpand } from "@/context/SidebarExpandContext";
import { ChevronLast } from "lucide-react";
import React, { createContext } from "react";
import { useState, useEffect } from "react";

export const SidebarExpandContext = createContext({ expanded: false });

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const { setExpanded } = useSidebarExpand();
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else if (window.scrollY + 20 < lastScrollY || window.scrollY === 0) {
      setShowNavbar(true);
    }
    lastScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`flex fixed top-0 h-16 py-6 w-full border-b-2 bg-white/20 dark:bg-black/60 backdrop-blur-md z-20 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <button
          onClick={() => setExpanded(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800"
        >
          <ChevronLast />
        </button>
      </nav>
    </>
  );
};
export default Navbar;
