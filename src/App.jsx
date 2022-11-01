import React, { useState, createContext } from 'react';
import { Outlet } from "react-router-dom";
import './app.css'
import { ToastContextProvider } from './components/ToastContex'

export const AppContext = createContext();

function App() {
    const [session, setSession] = useState(undefined);

    return (
        <AppContext.Provider value={{
            session: session,
            setSession: setSession
        }}>
            <ToastContextProvider>
                <Outlet />
            </ToastContextProvider>
        </AppContext.Provider>
    );
}

export default App;
