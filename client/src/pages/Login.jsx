import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import API_URL from "../api";
import showIcon from "../assets/images/show.png";
import hideIcon from "../assets/images/hide.png";

const Login = () => {
    const [show, setShow] = useState(false)
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
        axios.post(`${API_URL}/login`, formData)
            .then((res) => {
                if(res.data.message == 'Login Success')
                {
                toast.success(res.data.message);
                console.log(res.data)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                if (res.data.user.role === "admin"){
                    navigate('/admin/*')
                }
                else{
                    console.log(res.data.role)
                    navigate('/')
                }
                }
                else if(res.data.message == 'Invalid Credentials'){
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

                        <img onClick={toggle}
                            src={show ? hideIcon : showIcon} alt="show|hide"
                            height={'20px'} width={'20px'} />
                    </div>

                    <button type="submit">Login</button>

                    <p style={{ marginTop: "10px" }}>
                        Don't have an account?{" "}
                        <Link to={'/register'}>
                            Register
                        </Link>
                    </p>

                </form>
            </div>

        </>
    );
};

export default Login;