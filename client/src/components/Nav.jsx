import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  }

  return (
    <div className="nav">
      <div className="logo">
        <img src="src/assets/images/logo.png" alt="logo" height="70px" />
        <h1 className="title">Vee<span>Mart</span></h1>
      </div>

      <div className="info">
        {user ? (
          <>
            <Link to="/products">
              <h2>Products</h2>
            </Link>

            <Link to="/orders">
              <h2>Orders</h2>
            </Link>

            <Link to="/cart">
              <h2>Cart 🛒</h2>
            </Link>

            <h2 style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </h2>
          </>
        ) : (
          <Link to="/login">
            <h2>Login</h2>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;