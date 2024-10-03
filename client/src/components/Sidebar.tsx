import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel } from './ui/dropdown-menu';
import { DropdownMenuTrigger } from './ui/dropdown-menu';

const SidebarContext = createContext();


export const Sidebar = ({ children }) => {
    const { user, setUser } = useUser();
    const [expanded, setExpanded] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
        } else {
            setUsername("Login");
            setEmail("");
        }
    }, [user])

    const signOut = () => {
        setUser(null);
    }

    return (
        <>
            <aside className='flex h-full fixed top-0 left-0 z-50'>
                <nav className='h-full flex flex-col bg-background border-r shadow-lg'>
                    <div className='p-4 pb-2 flex justify-between items-center'>
                        <img src='https://img.logoipsum.com/243.svg'
                            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} />
                        <button onClick={() => setExpanded(curr => !curr)} className='p-1.5 rounded-lg bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800'>
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>
                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className='flex-1 px-3'>{children}</ul>
                    </SidebarContext.Provider>
                    <div className='border-t flex p-3'>
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`}
                            alt=''
                            className='w-10 h-10 rounded-full mr-3' />
                        <div className={`
                        flex justify-between items-center
                        overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}
                        `}>
                            <div className='leading-4'>
                                <h4 className='font-semibold'>{username}</h4>
                                <span className='text-sx text-gray-600'>{email}</span>
                            </div>
                            <div className='flex items-center justify-center p-2 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-800'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreVertical size={20} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel onClick={signOut} className="cursor-pointer">Sign out</DropdownMenuLabel>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    )
}

export const SidebarItem = ({ icon, text, link, active, alert }) => {
    const { expanded } = useContext(SidebarContext);
    return (
        <li className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors duration-200 group
        ${active ? 'dark:bg-neutral-800' : 'hover:bg-indigo-50 dark:hover:bg-neutral-600 text-gray-600 dark:text-white'
            }
        `}>
            <Link to={link} className='flex items-center' >
                {icon}
                <span className={` overflow-hidden transition-all
            ${expanded ? 'w-52 ml-3' : 'w-0'}`}>{text}</span>
                {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />}
            </Link>

            {!expanded && <div className={
                `absolute left-full top-1/2 transform -translate-y-1/2
                rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-indigo-800 text-sm
                invisible -translate-x-3 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                z-50 transition-all
                `
            }
                style={{ whiteSpace: 'nowrap' }}>
                {text}
            </div>}
        </li>
    )
}
