import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import avanza from '../images/avanza.png';
import nordnet from '../images/nordnet.png';

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="mt-40 text-secondary text-center">
                <h1 className="text-4xl text-primary">404</h1>
                <p>We could not find what you are looking for. <Link to="/" className="decration-none text-blue-400">Back to safety</Link>.</p>
            </div>
        </>
    );
}

export default NotFound;
