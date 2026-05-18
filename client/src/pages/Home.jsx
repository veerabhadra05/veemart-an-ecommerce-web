import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../api";

const Home = () => {

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  function fetchData() {
    axios.get(`${API_URL}/categories`)
      .then(x => {
        setCategories(x.data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  

  return (
    <>
      <Nav />

      <section className="welcome">
        <h2 className="title">Welcome to Vee<span>Mart</span></h2>

        <h2>Discover the best products at unbeatable prices</h2>
        <Link to="/products">
          <button>Shop now</button>
        </Link>
      </section>

      <div className="search">
        <h2 style={{ textAlign: 'center', color: 'orangeRed', fontSize: '35px',margin:'50px 50px' }}>
          Shop by Category
        </h2>
      </div>

      <section className="product-categories">

        {categories.map((cat) => (
          <div key={cat.id} className="image">
            <img src={cat.image} alt={cat.name} />
            <h3>{cat.name}</h3>
          </div>
        ))}

      </section>

      <Footer />
    </>
  );
};

export default Home;