import React from 'react';
import { useState, useContext } from 'react';
import Card from '../components/Card';
import TextInput from '../components/TextInput';
import { ChevronLeftIcon, PortfolioIcon, ArrowLeftIcon, ArrowRightIcon } from '../icons/Icons';
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import { clear } from '@testing-library/user-event/dist/clear';

import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../App';

const Login = () => {
    const app = useContext(AppContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const [errors, setErrors] = useState([])
    let navigate = useNavigate()

    const validateEmail = (localErrors) => {
        if (!email.includes("@")) {
            localErrors.push("Invalid Email")
        }
        return localErrors
    }

    const validatePassword = (localErrors) => {
        if (password.length < 6) {
            localErrors.push("Password needs to be 6 characters")
        }
        return localErrors
    }

    const validateRepeatPassword = (localErrors) => {
        if (password !== repeatPassword) {
            localErrors.push("Passwords needs to be equal")
        }
        return localErrors
    }

    const login = () => {
        let localErrors = []
        localErrors = validatePassword(localErrors)
        localErrors = validateEmail(localErrors)

        if (localErrors.length > 0) {
            setErrors(localErrors)
            return
        } else {
            setErrors([])
        }

        fetch("/api/sessions", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(resp => {
                if (resp.status === 401) {
                    setErrors(["Wrong credentials"])
                    return
                }
                return resp.json()
                    .then(resp => {
                        app.setSession(resp)
                        navigate("/dashboard")
                    })
            })
    }

    const sign_up = () => {
        let localErrors = []
        localErrors = validatePassword(localErrors)
        localErrors = validateEmail(localErrors)
        localErrors = validateRepeatPassword(localErrors)

        if (localErrors.length > 0) {
            setErrors(localErrors)
            return
        } else {
            setErrors([])
        }

        fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(resp => {
                if (resp.status === 401) {
                    setErrors(["Wrong credentials"])
                    return
                }
                return resp.json()
                    .then(resp => {
                        app.setSession(resp)
                        navigate("/upload")
                    })
            })
    }

    const executeOnEnter = (event) => {
        console.log("keydown")
        if (event.keyCode === 13) {
            isSignUp ? sign_up() : login()
        }
    }

    return (
        <div className="bg-slate-50 min-h-screen pt-32">
            <Card className="max-w-md mx-auto grid gap-5">
                {isSignUp ?
                    <Button
                        text="Login"
                        Icon={ArrowLeftIcon}
                        design="secondary"
                        className="place-self-start text-sm "
                        onClick={(e) => {
                            setErrors([])
                            setIsSignUp(false)

                        }}
                        rightIcon={false}
                        xs={true}
                    /> :
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2 items-center">
                            <PortfolioIcon className="fill-secondary w-6 h-6"/>
                            <span className="text-secondary text-sm">divdash</span>
                        </div>
                        <Button
                            text="Sign up"
                            Icon={ArrowRightIcon}
                            design="secondary"
                            className="place-self-end text-sm"
                            onClick={(e) => {
                                setErrors([])
                                setIsSignUp(true)
                            }}
                            xs={true}
                        />
                    </div>
                }

                <TextInput
                    setFunction={setEmail}
                    value={email}
                    label={"Email"}
                    placeholder="examle@example.com"
                />
                <TextInput
                    setFunction={setPassword}
                    value={password}
                    label={"Password"}
                    type="password"
                    placeholder={"TPPL4zXd7?9qqAs@by$!"}
                    onKeyDown={(e) => !isSignUp ? executeOnEnter(e) : {}}
                />
                {isSignUp && (
                    <TextInput
                        setFunction={setRepeatPassword}
                        value={repeatPassword}
                        label={"Repeat Password"}
                        type="password"
                        placeholder={"TPPL4zXd7?9qqAs@by$!"}
                        onKeyDown={(e) => executeOnEnter(e) }
                    />
                )}
                {errors.length > 0 && (
                    <div className="bg-red-100 p-3 rounded">
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index} className="text-sm py-1 text-red-500">
                                    {error}
                                </li>
                            ))}
                        </ul>
                    </div>)}
                <Button
                    text={isSignUp ? "Sign up" : "Login"}
                    onClick={(e) => isSignUp ? sign_up() : login()}
                    className="place-self-end"
                    disabled={email === "" || password === "" || (isSignUp && repeatPassword === "")}
                />
            </Card>
        </div>

    );
}

export default Login;
