import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [msgType, setmsgType] = useState("");
    // const mailformat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const emailInputHandler = (e) => {
        setError("");
        setEmail(e.target.value);
    }

    const passwordInputHandler = (e) => {
        setPassword("");
        setPassword(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (email.trim() === "") {
            setError("Please Enter Email Address");
            setmsgType("alert-danger m-1");
            return;
        }
        else if (password.trim() === "") {
            setError("Please Enter Password");
            setmsgType("alert-danger m-1");
            return;
        }
        else if (!(passw.test(password))) {
            setError("Please Enter vallid Password");
            setmsgType("alert-danger m-1");
            return;
        }
        else {
            const loginData = {
                username: email,
                password: password
            }
            fetch('http://127.0.0.1:2610/login', {
                method: "POST",
                body: JSON.stringify(loginData),

                headers: { 'Content-Type': 'application/json' }
            }).then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.status === true) {
                        setError(result.message)
                        setmsgType("alert-success m-1");
                    }
                    else {
                        setError(result.message)
                        setmsgType("alert-danger m-1");
                    }
                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <div className={msgType} role="alert">
                            {error}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <div className="card mt-2">
                            <div className="card-header">
                                <h2 className="text-center alert alert-primary">Login</h2>
                            </div>
                            <form method='POST' onSubmit={submitHandler}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <center><i><h4> Email, Username, Phonenumber </h4></i></center>
                                        <input type="text" name="id" className="form-control" placeholder="Email, Username, Phonenumber" value={email} onChange={emailInputHandler} ></input>
                                    </div>
                                    <div className="form-group">
                                        <center><i><h4> Password </h4></i></center>
                                        <input type="password" name="pwd" className="form-control" placeholder="Password" value={password} onChange={passwordInputHandler}  ></input>
                                    </div>
                                </div>
                                <div className="card-footer text-center bg-warning">
                                    <button className="btn btn-success" type="submit">Submit</button>
                                    <p className="text-center">Create an account? <Link to="/register">SignUp</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
