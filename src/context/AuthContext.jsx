import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(localStorage.getItem('username'))

    const login = userData => {
        setUsername(userData)

        localStorage.setItem('username', userData)
        console.log('Context :: Login')
    }

    const logout = () => {
        localStorage.removeItem('username')
        console.log('Context :: Logout')
    }

    return (
        <AuthContext.Provider value={{ username, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}