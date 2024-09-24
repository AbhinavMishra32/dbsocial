import React from 'react';
import { Sidebar, SidebarItem } from './Sidebar';
import { BarChart3, Home, LayoutDashboard, PlusCircle, Settings, User } from 'lucide-react';
import { useUser } from '../context/UserContext';


const Layout = ({ children }) => {
    const { user } = useUser();
    return (
        <div className='flex h-screen'>
            {user && (
                <>
                    <Sidebar>
                        <SidebarItem icon={<Home size={20} />} text='Home' active />
                        <SidebarItem icon={<User size={20} />} text='Profile' alert />
                        <SidebarItem icon={<PlusCircle size={20} />} text='Create Post' />
                        <hr className='my-3' />
                        <SidebarItem icon={<Settings size={20} />} text='Settings' />
                    </Sidebar>
                    <div className='flex flex-col w-full'>
                        {children}
                    </div>
                </>
            )}
        </div>
    )
}

export default Layout;