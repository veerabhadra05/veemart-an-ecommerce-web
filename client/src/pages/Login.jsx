import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import API_URL from "../api";
import showIcon from "../assets/images/show.png";
import hideIcon from "../assets/images/hide.png";
import Loader from "../components/Loader";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [show, setShow] = useState(false)
    const [isfetching, setIsfetching] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    function toggle() {
        setShow(!show)
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
        setIsfetching(true)
        axios.post(`${API_URL}/login`, formData)
            .then((res) => {
                if(res.data.message == 'Login Success')
                {
                toast.success(res.data.message);
                setIsfetching(false)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                if (res.data.user.role === "admin"){
                    navigate('/admin/*')
                }
                else{
                    navigate('/')
                }
                }
                else if(res.data.message == 'Invalid Credentials'){
                    setIsfetching(false)
                    toast.error(res.data.message)
                    navigate('/login')
                }
            })
            .catch(err => {
                console.log('Server Error')
            })
    }



    return (
        <>
            <div className="login-container">
                <h1>Welcome Back to <span className="title">Vee<span>Mart</span></span></h1>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label>Email *</label>
                    <input type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        required />

                    <label>Password *</label>
                    <div className="password-field">
                        <input
                            type={show ? "text" : "password"}
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required />

                            <div className="password-icon" onClick={toggle}>
                                {show ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </div>
                    </div>

                    <button type="submit">{isfetching ? "Logging in...":"Login"}</button>

                    <p style={{ marginTop: "10px" }}>
                        Don't have an account?{" "}
                        <Link to={'/register'}>
                            Register
                        </Link>
                    </p>

                </form>
            </div>

            {isfetching && 
                <Loader/>
                
            }
        </>
    );
};

export default Login;