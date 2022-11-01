import React, { useEffect, useRef, useState, createContext } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { DashboardIcon, PortfolioIcon, TransactionIcon, InstrumentIcon, LogoIcon, UploadIcon, MenuIcon, CrossIcon } from './icons/Icons'
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
