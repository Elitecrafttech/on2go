import { createContext, useState } from "react";


export const AppContext = createContext();

export function AppContextProvider({ children }) {
    const [userAuth, setUserAuth] = useState(false);

    return (
        <AppContext.Provider value={{ userAuth, setUserAuth }}>
            {children}
        </AppContext.Provider>
    );
}