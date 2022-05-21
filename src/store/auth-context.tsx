import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserBySearch, getUserById } from '../api/app-users';
import User from '../models/User';

interface Props {
    token: string | null;
    isLoggedIn: boolean;
    login: (token: string, userName: string) => void;
    logout: () => void;
    user: User | null;
}

const authObj: Props = {
    token: '',
    isLoggedIn: false,
    login: (token: string, userName: string) => {},
    logout: () => {},
    user: { id: '', email: '', userName: '', movies: [] },
};

const AuthContext = React.createContext<Props>(authObj);

// Custom hook for authContext (reduce import bundle)
export const useAuthContext = () => useContext(AuthContext);

const ONE_HOUR = 1000 * 60 * 60;

export const AuthContextProvider: React.FC = (props) => {
    const navigate = useNavigate();

    const retrievedToken = localStorage.getItem('token');
    const retrievedEmail = localStorage.getItem('email');
    const retrievedId = localStorage.getItem('id');

    const [token, setToken] = useState<string | null>(retrievedToken);
    const [email, setEmail] = useState<string | null>(retrievedEmail);
    const [userId, setUserId] = useState<string | null>(retrievedId);
    const [user, setUser] = useState<User | null>(null);

    const isLoggedIn = !!token;

    const login = useCallback((token: string, email: string) => {
        if (!token) return;
        setToken(token);
        setEmail(email);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setEmail(null);
        setUser(null);
        setUserId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        navigate('/home');
    }, [navigate]);

    // Two ways that  gets User from the server.
    const tryGetUserById = useCallback(async () => {
        const id = localStorage.getItem('id');
        if (!id) return;
        const user = await getUserById(id);
        setUser(user);
    }, []);

    const tryGetUserByEmail = useCallback(async () => {
        if (token && email) {
            // Get the user Obj from the Database.
            const userFound = await getUserBySearch(email);

            if (!userFound) return;
            // Store userId so that user can be retrieved once the user re-loads the page.\
            localStorage.setItem('id', userFound.id);
            setUserId(userFound.id);
            setUser(userFound);
        }
    }, [token, email]);

    // Automatically try to login user if there is any stored user info
    useEffect(() => {
        if (userId) {
            tryGetUserById();
        } else if (email && token) {
            tryGetUserByEmail();
        }
    }, [token, email, userId, tryGetUserById, tryGetUserByEmail]);

    // Automatically logout the user after 1 hour.
    useEffect(() => {
        let timer = setTimeout(() => {
            logout();
        }, ONE_HOUR);

        return () => {
            clearTimeout(timer);
        };
    }, [token, email, userId, logout]);

    const values = {
        token,
        isLoggedIn,
        login,
        logout,
        user,
    };

    return <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
