import React from "react";

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div>
        <h2>Cartify 🛒</h2>
      </div>

      <div>
            <h2>Categories</h2>
            <ul>
                <li>Electronics</li>
                <li>Kitchen</li>
                <li>Dairy Products</li>
                <li>Kids Wear</li>
                <li>Mens Wear</li>
                <li>Ladies Wear</li>
                <li>Fruits</li>
                <li>Vegetables</li>
            </ul>
      </div>

      <div>
        <h2>Contact us</h2>
        <ul>
            <li>Bengaluru, India</li>
            <li>veerabhadra@yahoo.in</li>
            <li>+91 9865984152</li>
        </ul>
      </div>
      </section>
    </>
  );
};

export default Footer;