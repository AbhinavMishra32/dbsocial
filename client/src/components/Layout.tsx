import React, { useEffect, useState } from "react";
import { Sidebar, SidebarItem } from "./Sidebar";
import {
  BarChart3,
  Home,
  LayoutDashboard,
  PlusCircle,
  Settings,
  User,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };
  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);
  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarItem
          icon={<Home size={20} />}
          text="Home"
          link="/"
          active={isActive("/dashboard")}
          alert={undefined}
        />
        <SidebarItem
          icon={<User size={20} />}
          text="Profile"
          link={`/user/${username}`}
          alert
          active={isActive(`/user/${username}`)}
        />
        <SidebarItem
          icon={<PlusCircle size={20} />}
          text="Create Post"
          link={undefined}
          active={undefined}
          alert={undefined}
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          active={isActive("/settings")}
          link={undefined}
          alert={undefined}
        />
      </Sidebar>
      <div className="w-19 bg-red-300"></div>
      <div className="flex flex-col flex-grow items-center pt-16">
        <Navbar />
        <div className="w-full max-w-3xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
