import React from 'react';

const ButtonIcon = ({Icon, className, onClick, disabled = false}) => {
    return (
        <button
            className={`group ${disabled ? "" : "hover:bg-slate-100"} w-8 h-8 flex justify-center items-center rounded ${className}`}
            onClick={disabled ? () => {} : onClick}
            disabled={disabled}
        >
            <Icon className={`fill-secondary w-6 h-6 ${disabled ? "fill-slate-200" : "group-hover:fill-primary "}`} />
        </button>
    );
}

export default ButtonIcon;
