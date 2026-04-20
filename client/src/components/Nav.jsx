import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <>
      <div className="nav">
        <div className="logo">
          <img src="src/assets/images/logo.png" alt="logo"  height={'70px'}/>
          <h1 className="title">Vee<span>Mart</span></h1>
        </div>
        <div className="info">
            <Link to={'/'}>
               <h2>Home</h2>
            </Link>
              
           
            <Link to={'/products'}>
              <h2>Products</h2>
            </Link>
            <a href="">
                <h2>Orders</h2>
            </a>
              <Link>
                <h2>
                  Cart 🛒
                </h2>
              </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;