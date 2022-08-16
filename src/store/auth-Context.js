
import { createContext, useState}from 'react'

export const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {

    const InitialStorage = localStorage.getItem("token")

    const [token, settoken] = useState(InitialStorage)


    const userIsLoggedIn = !!token 

    const loginHandler = (token) => {
        localStorage.setItem("token",token)
        settoken(token)
    }

    const logoutHandler = () => {
        localStorage.removeItem("token")
        settoken(null)

    }

    const ContextValue = {
        token,
        userIsLoggedIn,
        loginHandler,
        logoutHandler
    }


    return <AuthContext.Provider value={ContextValue}>
        {children}
    </AuthContext.Provider>

}