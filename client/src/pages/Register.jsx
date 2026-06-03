import React,{useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../api";

const Register = () => {
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:""
    });
    
    const navigate = useNavigate()

    function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.warn('Please fill all required fields')
      return;
    }

    // Send data to db.json
    
    axios.post(`${API_URL}/register`, formData)
      .then((res) => {
        toast.success(res.data.message);
        navigate('/login')
        setFormData({
          name: "",
          email: "",
          password: ""
        });
      })
      .catch((err) => {
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error(err.response.data.message)
        }
        console.log(err);
      });
  }


  return (
    <>
      <div className="register-container">
        <h1 className="register-heading">
          Welcome to <span className="title">Vee<span>Mart</span></span>
        </h1>

        <form onSubmit={handleSubmit} className="register-form">

          <label>Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email *</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password *</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Register</button>

          <p style={{ marginTop: "10px" }}>
            Already have an account?{" "}
            <Link to={'/login'}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;