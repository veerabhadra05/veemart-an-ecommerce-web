import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
const Nav = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="nav">
      <div className="logo">
        <img src= {logo} alt="logo" height="70px" />
        <h1 className="title">Vee<span>Mart</span></h1>
      </div>

      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`info ${menuOpen ? "show-menu" : ""}`}>
      {
        user ? (
          <>
        <NavLink
          className="nav-links"
          onClick={closeMenu}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className="nav-links"
          onClick={closeMenu}
          to="/products"
        >
          Products
        </NavLink>

        <NavLink
          className="nav-links"
          onClick={closeMenu}
          to="/cart"
        >
          Cart
        </NavLink>

        <NavLink
          className="nav-links"
          onClick={closeMenu}
          to="/orders"
        >
          Orders
        </NavLink>

        <span
          className="nav-links"
          onClick={handleLogout}
          
        >
          Logout
        </span>
        
        </>
        ) : (
          <NavLink
          className="nav-links"
          onClick={closeMenu}
          to="/login"
        >
          Login
        </NavLink>
        )
      }
        
        

      </div>
    </div>
  );
};

export default Nav;