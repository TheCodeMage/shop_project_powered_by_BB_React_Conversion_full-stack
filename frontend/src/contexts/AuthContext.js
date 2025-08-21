import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/auth/user/', {
                withCredentials: true
            });
            setUser(response.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login/', {
                username,
                password
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                setUser(response.data.user);
                return { success: true };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: 'Login failed' };
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/register/', userData, {
                withCredentials: true
            });

            if (response.data.success) {
                setUser(response.data.user);
                return { success: true };
            }
            return { success: false, message: 'Registration failed' };
        } catch (error) {
            return { success: false, message: 'Registration failed' };
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:8000/api/auth/logout/', {}, {
                withCredentials: true
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
        }
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
