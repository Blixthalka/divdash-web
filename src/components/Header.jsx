import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CrossIcon, DashboardIcon, InstrumentIcon, LogOutIcon, MenuIcon, PortfolioIcon, TransactionIcon, UploadIcon } from '../icons/Icons';
import Button from './Button';
import ButtonIcon from './ButtonIcon';

function ChartToggle({ className }) {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate()

    const iconClass = "fill-secondary group-hover:fill-primary"
    const navs = [
        {
            name: "Dashboard",
            link: "/dashboard",
            icon: <DashboardIcon className={iconClass} />
        },
        {
            name: "Instruments",
            link: "/instruments",
            icon: <InstrumentIcon className={iconClass} />
        },
        {
            name: "Dividends",
            link: "/dividends",
            icon: <TransactionIcon className={iconClass} />
        },
        {
            name: "Upload",
            link: "/upload",
            icon: <UploadIcon className={iconClass} />
        },
    ]

    const logout = () => {
        fetch("/api/logout", {
            method: "DELETE"
        })
            .then(resp => {
                setShowMenu(false)
                if (resp.status === 200) {
                    navigate("/login")
                }
            })
    }


    return (
        <>
            <div className={`border-b border-slate-300 bg-white px-5 ${className}`}>
                <div className="max-w-4xl mx-auto py-2 flex justify-between">
                    <div className="flex space-x-2 items-center">
                        <NavLink to="/">
                            <ButtonIcon Icon={PortfolioIcon} />
                        </NavLink>
                        <span className="text-primary text-sm">divdash</span>
                    </div>
                    <ButtonIcon onClick={(e) => setShowMenu(true)} Icon={MenuIcon} />
                </div>
            </div>
            {showMenu &&
                <nav className="absolute top-0 right-0 bg-white w-full h-full z-10">
                    <div className="max-w-4xl mx-auto py-2 flex flex-col">
                        <div className="flex justify-between items-center">
                            <div className="flex space-x-2 items-center">
                                <ButtonIcon Icon={PortfolioIcon} disabled={true} />
                                <span className="text-secondary text-sm">divdash</span>
                            </div>
                            <ButtonIcon Icon={CrossIcon} onClick={(e) => setShowMenu(false)} className="place-self-end" />
                        </div>
                        <div className="w-full py-10 flex flex-col space-y-2">
                            {navs.map((nav) => (
                                <NavLink
                                    to={nav.link}
                                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                                    onClick={(e) => setShowMenu(false)}
                                >
                                    <div className="flex items-center space-x-2 group text-secondary w-full">
                                        {nav?.icon}
                                        <span className="group-hover:text-primary">{nav.name}</span>
                                    </div>
                                </NavLink>
                            ))}
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-secondary pl-2">Created by <a className="text-blue-400" href="https://twitter.com/blixthalka">@blixthalka</a></span>
                            <Button
                                text="Logout"
                                className="place-self-end w-fit"
                                design="secondary"
                                Icon={LogOutIcon}
                                xs={true}
                                onClick={(e) => logout()}
                            />
                        </div>

                    </div>
                </nav>}
        </>
    );

}

export default ChartToggle;
