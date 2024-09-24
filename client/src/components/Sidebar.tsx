import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const SidebarContext = createContext();


export const Sidebar = ({ children }) => {
    const { user } = useUser();
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

    return (
        <>
            <aside className='flex h-full fixed top-0 left-0 z-50'>
                <nav className='h-full flex flex-col bg-white border-r shadow-lg'>
                    <div className='p-4 pb-2 flex justify-between items-center'>
                        <img src='https://img.logoipsum.com/243.svg'
                            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} />
                        <button onClick={() => setExpanded(curr => !curr)} className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'>
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>
                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className='flex-1 px-3'>{children}</ul>
                    </SidebarContext.Provider>
                    <div className='border-t flex p-3'>
                        <img src='https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true'
                            alt=''
                            className='w-10 h-10 rounded-md mr-3' />
                        <div className={`
                        flex justify-between items-center
                        overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}
                        `}>
                            <div className='leading-4'>
                                <h4 className='font-semibold'>{username}</h4>
                                <span className='text-sx text-gray-600'>{email}</span>
                            </div>
                            <MoreVertical size={20} />
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
        ${active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : 'hover:bg-indigo-50 text-gray-600'
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
