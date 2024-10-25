import { useSidebarExpand } from "@/context/SidebarExpandContext";
import { Menu } from "lucide-react";
import React, { createContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const SidebarExpandContext = createContext({ expanded: false });

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const { setExpanded } = useSidebarExpand();
  const location = window.location.pathname;
  const { username } = useParams();
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (window.innerWidth >= 768) {
      setShowNavbar(true);
    } else {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else if (window.scrollY + 20 < lastScrollY || window.scrollY === 0) {
        setShowNavbar(true);
      }
      lastScrollY = window.scrollY;
    }
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
        className={`flex fixed top-0 h-16 w-full border-b-2 bg-white/20 dark:bg-black/60 backdrop-blur-md z-20 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-center items-center w-full px-4">
          <button
            onClick={() => setExpanded(true)}
            className=" md:hidden px-2 rounded-lg absolute top-3 left-4 z-50 p-2"
          >
            <Menu />
          </button>
          <span>
            {(() => {
              switch (location) {
                case "/":
                  return "Home";
                case "/dashboard":
                  return "Dashboard";
                case "/settings":
                case "/user/" + username:
                  return username + "'s Profile";
                default:
                  return "Home";
              }
            })()}
          </span>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
