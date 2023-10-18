import React, { useEffect, useState } from 'react'
import './Form.css';
import axios from "axios";


export default function RegisterUser({ }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setNum] = useState("");
    const [password, setPassword] = useState("");
    const [userRole, setRole] = useState(''); // Initialize the role state

    const [error, setError] = useState(false);
    const [loding, setLoding] = useState(false);

    // call useeffcet for get localStorage
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            // history.push("/profile");
        }
    }, [])


    //handle form data
    function sendData() {
        const NewReg = {
            name,
            email,
            mobileNumber,
            password,
            userRole
        };
        console.log(NewReg);
        axios.post("https://traingo.onrender.com/api/Admin", NewReg)
            .then((res) => {
                localStorage.setItem('myData', JSON.stringify(res.data));
                alert("Registration Successful");
                window.location.href = "/Dashboard";
            })
            .catch((err) => {
                alert(err);
            });

        alert("Registration Successful")


    }


    const getData = async (e) => {
        e.preventDefault();
        const email = document.getElementById('logemail').value;
        const pass = document.getElementById('logpass');

        if (email == '' || email.includes('@' && '.com') == false) {

            alert("Enter Valid email Address")
            return false;
        }
        else if (pass.value == '' || pass.value == null) {
            alert("pass Required");
            return false
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
            setLoding(true);

            const response = await axios.post(
                "https://traingo.onrender.com/api/Admin/login",
                {
                    email,
                    password
                },
                config
            );

            if (response.status === 200) {
                // Successful login
                const data = response.data;
                console.log(data);
                localStorage.setItem("myData", JSON.stringify(data));
                alert("Successfully logged in");
                window.location.href = "/Dashboard";

            } else {
                // Wrong password or other error
                alert("Wrong password or other error occurred");
            }

            setLoding(false);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Wrong password");
            } else {
                // Handle other errors
                setError(error.response?.data?.message || "An error occurred");
            }
        }


    }


    return (
        <div>
            <div className="logincss ">

                <div className="info">
                    <div className="container containerabc" id="container">
                        <div className="form-container form-containerabc sign-up-container sign-up-containerabc">

                            <form onSubmit={sendData} className="form12">

                                <input className="inputabc" type="text" placeholder="Name" id="Name" onChange={(e) => { setName(e.target.value); }} required />
                                <input className="inputabc" type="email" placeholder="Email" id="Email" onChange={(e) => { setEmail(e.target.value); }} required />
                                <input className="inputabc" type="number" placeholder="Mobile" id="Number" onChange={(e) => { setNum(e.target.value); }} required />
                                <input className="inputabc" type="password" placeholder="Password" id="Password" onChange={(e) => { setPassword(e.target.value); }} required />
                                <div className="role-selection">
                                    <label>
                                        <input
                                            type="radio"
                                            value="0"
                                            onChange={(e) => setRole(e.target.value)}
                                            checked={userRole === '0'}
                                        />
                                        Back Office
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="1"
                                            onChange={(e) => setRole(e.target.value)}
                                            checked={userRole === '1'}
                                        />
                                        Travel Agent
                                    </label>
                                </div>
                                <button className="button12 " type="submit">Sign Up</button>
                            </form>

                        </div>
                        <div className="form-container form-containerabc sign-in-container sign-in-containerabc">

                            <form onSubmit={getData} className="form12">
                                <h1 className="h111">Sign in</h1>


                                <input className="inputabc" type="text" placeholder="Email" id='logemail' value={email} onChange={(e) => { setEmail(e.target.value); }} />
                                <input className="inputabc" type="password" placeholder="Password" id='logpass' value={password} onChange={(e) => { setPassword(e.target.value); }} />
                                <a href="/reset" className="a123" >Forgot your password?</a>
                                <button className="button12  ">Sign In</button>
                            </form>

                        </div>
                        <div className="overlay-container overlay-containerabc">
                            <div className="overlay overlayabc">
                                <div className="overlay-panel overlay-panelabc overlay-left overlay-leftabc">
                                    <h1 className="h111">Welcome Back!</h1>
                                    <p className="p123">To keep connected with us please login with your personal info</p>
                                    <button className="button12 ghost " id="signIn" onClick={window['log']}>Sign In</button>
                                </div>
                                <div className="overlay-panel overlay-panelabc overlay-right overlay-rightabc">
                                    <h1 className="h111">Backoffice and Travel Agent</h1>
                                    <p className="p123">Enter your personal details and start journey with us</p>
                                    <button className="button12 ghost " id="signUp" onClick={window['reg']}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



        </div>
    )

}
