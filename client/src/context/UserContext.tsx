import { createContext, useContext, useEffect, useState } from 'react';

interface User {
    id: string,
    token: string,
    username: string,
    email: string,
}

interface UserContextProps {
    user: User | null,
    setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({children}: { children: React.ReactNode}) => {
    const [user, setUserState] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserState(JSON.parse(storedUser))
        }
    }, []);

    const setUser = (user: User | null) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            console.log("User set:", user);
        }else{
            localStorage.removeItem('user');
        }
        setUserState(user);
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};