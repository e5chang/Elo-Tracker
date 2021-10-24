import { createContext, useContext } from "react";

interface AuthContext {
    loggedIn: boolean;
}

const authContext = createContext<AuthContext | undefined>(undefined);

export function initializeAuthContext(): AuthContext {
    return {
        loggedIn: false
    }
}

export function useAuthContext() {
    const context = useContext(authContext);

    if (!context) throw new Error();

    return context;
}

export const AuthContextProvider = authContext.Provider;