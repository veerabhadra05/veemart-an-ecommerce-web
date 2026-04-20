import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
const Login = () => {
    const [show,setShow] = useState(false)
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate()

    function toggle(){
        setShow(!show)
    }
    function handleChange(e){
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    }
    function handleSubmit(e){
        e.preventDefault();
        axios.post(`http://localhost:5000/login`,formData)
        .then((res)=>{
            toast.success(res.data.message);
            localStorage.setItem('user',JSON.stringify(res.data.user))
    
            navigate('/home')
        })
        .catch(err=>{
            if(err.response){
                toast.error(err.response.data.message)
            }else{
                console.log('Server Error')
            }
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
                required/>

                <label>Password *</label>
                <div className="password-field">
                    <input 
                    type={show ? "text" : "password"} 
                    name="password" 
                    placeholder="Enter password" 
                    value={formData.password}
                    onChange={handleChange}
                    required/>

                    <img onClick={toggle} 
                    src={show?"src/assets/images/hide.png":"src/assets/images/show.png"} alt="show|hide" 
                    height={'20px'} width={'20px'} />
                </div>

                <button type="submit">Login</button>
                
            </form>
        </div>
        
    </>
  );
};

export default Login;