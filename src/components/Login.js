import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Login.css'
export default function Login() {
    const [flag, setFlag] = useState(false);
    const history = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailCheck,setEmailCheck] = useState(false);
    const [passwordCheck,setPasswordCheck] = useState(false);
    // const [response, setResponse] = useState("");

    useEffect(() => {
        (async()=>{
        if(localStorage.getItem("token")) {
            let resData = await axios.get("http://localhost:8080/api/getUserFromToken", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (resData.data.success === 1) {
                history("/")
            }
        }
    })()
    },[])

    const handleLogin = async () => {
        //useername validation
        if(!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(username)) || emailCheck.length===0){
            setEmailCheck("Email Invalid");
            return;
        }
        if(password.length<6){
            setPasswordCheck("Enter valid password")
            return;
        }
        setFlag(true);
        let data = await axios.post("http://localhost:8080/api/login", {
            username,
            password
        })
        if (data.data.success === 1) {
            setFlag(false)
            localStorage.setItem("token",data.data.token )
            history("/");
        } else {
            setFlag(false)
            alert("Login Failed")
        }
        console.log(data.data);
        //setResponse(data.data);
    };
    return (
        <>{
            flag === true ? <>Loading...</> :
                <main>
                    <div className="outer">
                        <div className="plus">
                            <div className="circle"></div>
                        </div>
                        <div className="login">Login</div>
                        <div className="login-in-to">Sign In</div>
                        <div className="label-text">Username</div>
                        <div className="input-text">
                        {emailCheck && <p style={{ color: "red", fontSize: "10px" }}>{emailCheck}</p>}
                            <input type="email" value={username} onChange={e => setUsername(e.target.value)} placeholder="example@example.com" />
                        </div>
                        <div className="label-text">Password</div>

                        <div className="input-text">
                        {passwordCheck && <p style={{ color: "red", fontSize: "10px" }}>{passwordCheck}</p>}
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Your Password" />
                        </div>
                        <div className="btn">
                            <button type = "button" onClick={handleLogin}>Sign In</button>
                        </div>
                    </div>
                </main>
        }
        </>
    )
}