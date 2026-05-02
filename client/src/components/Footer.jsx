import React from "react";

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div>
        <h2 className="title">Vee<span>Mart</span> 🛒</h2>
      </div>

      <div>
            <h2>Categories</h2>
            <ul>
                <li>Mobiles</li>
                <li>Laptops</li>
                <li>Footwear</li>
                <li>Clothing</li>
                <li>Watches</li>
                <li>Headphones</li>
                <li>Books</li>
                <li>Home Appliances</li>
                <li>Gaming</li>
                <li>Accessories</li>
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