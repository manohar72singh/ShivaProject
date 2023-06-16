import React, { useState } from 'react'
import { Link } from 'react-router-dom';
export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [designation, setDesignation] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [pinecode, setPincode] = useState(0)
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [msgType, setmsgType] = useState("");
    const mailformat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const nameInputHandler = (e) => {
        setError("")
        setName(e.target.value);
    }

    const emailInputHandler = (e) => {
        setError("");
        setEmail(e.target.value);
    }

    const usernameInputHandler = (e) => {
        setError("");
        setUsername(e.target.value);
    }

    const phonenumberInputHandler = (e) => {
        setError("");
        setPhonenumber(e.target.value);
    }

    const designationInputHandler = (e) => {
        setError("");
        setDesignation(e.target.value);
    }

    const stateInputHandler = (e) => {
        setError("");
        setState(e.target.value);
    }
    const cityInputHandler = (e) => {
        setError("");
        setCity(e.target.value);
    }
    const districtInputHandler = (e) => {
        setError("");
        setDistrict(e.target.value);
    }
    const pinecodeInputHandler = (e) => {
        setError("");
        setPincode(e.target.value);
    }

    const passwordInputHandler = (e) => {
        setError("");
        setPassword(e.target.value);
    }


    const submitHandler = (e) => {
        e.preventDefault();
        if (name.trim() === "") {
            setError("Please Enter First Name");
            setmsgType("alert-danger m-1");
            return;
        }

        else if (email.trim() === "") {
            setError("Please Enter Email Address");
            setmsgType("alert-danger m-1");
            return;
        }
        else if (!(mailformat.test(email))) {
            setError("Please Enter Vallid Email Address");
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
            const userData = {
                name: name,
                username: username,
                email: email,
                phoneNumber: phonenumber,
                designation: designation,
                state: state,
                city: city,
                district: district,
                pinecode: pinecode,
                password: password
            }
            // console.log(userData)
            // console.log(typeof (pinecode))
            fetch('http://127.0.0.1:2610/register', {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json"
                }

            }).then((res) => res.json())
                .then((result) => {
                    if (result.status === true) {
                        setError(result.message)
                        setmsgType("alert-success m-1");
                    }
                    else {
                        setError(result.message)
                        setmsgType("alert-success m-1");
                    }

                }).catch((err) => {
                    console.log(err)
                })
            // setName("")
            // setEmail("")
            // setPassword("")
        }
    }
    return (
        <>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            <div className={msgType} role="alert">
                                {error}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            <div className="card m-1">
                                <div className="card-header">
                                    <h2 className="text-center alert alert-primary">
                                        <i>User Registration</i>
                                    </h2>
                                </div>
                                <form onSubmit={submitHandler}>
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <center><i><h4> Name </h4></i></center>
                                                    <input type="text" name="name" className="form-control" placeholder="Enter Your Name" value={name} onChange={nameInputHandler} ></input>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <center><i><h4> Username </h4></i></center>
                                                    <input type="text" name="username" className="form-control" placeholder="username" value={username} onChange={usernameInputHandler} ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <center><i><h4> Email Id </h4></i></center>
                                                    <input type="email" name="email" className="form-control" placeholder="Email" value={email} onChange={emailInputHandler} ></input>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <center><i><h4> Phonenumber </h4></i></center>
                                                    <input type="text" name="phonenumber" className="form-control" placeholder="Phonenumber" value={phonenumber} onChange={phonenumberInputHandler}  ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <center><i><h4>Designation</h4></i></center>
                                                    <input type="text" placeholder="Designation" className="form-control" value={designation} onChange={designationInputHandler} />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <center><i><h4>State</h4></i></center>
                                                    <input type="text" className="form-control" placeholder="State" value={state} onChange={stateInputHandler} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <center><i><h4>City </h4></i></center>
                                                    <input type="text" placeholder="City" className="form-control" value={city} onChange={cityInputHandler} />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <center><i><h4>District</h4></i></center>
                                                    <input type="text" className="form-control" placeholder="District" value={district} onChange={districtInputHandler} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <center><i><h4>Pincode</h4></i></center>
                                                    <input type='number' placeholder="Pinecode" className="form-control" value={pinecode} onChange={pinecodeInputHandler} />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <center><i><h4>Password </h4></i></center>
                                                    <input type="password" placeholder="Password" className="form-control" value={password} onChange={passwordInputHandler} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer text-center bg-warning">
                                        <button className="btn btn-success " type="submit">Submit</button>
                                        <p className="text-center">Already have an account.Login? <Link to="/login">Login</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
