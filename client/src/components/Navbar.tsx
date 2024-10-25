import React from "react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    console.log("scrolly: ", window.scrollY);
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else if (window.scrollY + 20 < lastScrollY) {
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
    <nav
      className={`flex fixed top-0 h-16 py-6 w-full border-b-2 bg-white/20 dark:bg-black/60 backdrop-blur-md z-20 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    ></nav>
  );
};

export default Navbar;
