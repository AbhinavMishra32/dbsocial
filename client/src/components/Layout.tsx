import React, { useEffect, useState } from 'react';
import { Sidebar, SidebarItem } from './Sidebar';
import { BarChart3, Home, LayoutDashboard, PlusCircle, Settings, User } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
    const { user } = useUser();
    const [username, setUsername] = useState("");
    useEffect(() => {
        if (user) {
            setUsername(user.username);
        }
    })
    return (
        <div className='flex h-screen'>
            <Sidebar>
                <SidebarItem icon={<Home size={20} />} text='Home' link='/' active />
                <SidebarItem icon={<User size={20} />} text='Profile' link={`/profile/${username}`} alert />
                <SidebarItem icon={<PlusCircle size={20} />} text='Create Post' />
                <hr className='my-3' />
                <SidebarItem icon={<Settings size={20} />} text='Settings' />
            </Sidebar>
            <div className='flex flex-col w-full'>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
