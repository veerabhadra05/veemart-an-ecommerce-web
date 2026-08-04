import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";
import Loader from "../components/Loader";

const Home = () => {

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate()

  function fetchData() {
    setIsloading(true)
    axios.get(`${API_URL}/categories`)
      .then(x => {
        setIsloading(false)
        setCategories(x.data);
      })
      .catch(err => {
        setIsloading(false)
        toast.error('Failed to load products')
        console.log(err)
      });
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

        <h2 className="category-heading" >
          Available Categories
        </h2>
     

      <section className="product-categories">

        {categories.map((cat) => (
          <div key={cat.id} className="image">
            <button style={{border:'none'}} onClick={()=> navigate(`/products/category/${cat.name}`)}>
              <img src={cat.image} alt={cat.name} />
            </button>
            <h3>{cat.name}</h3>
          </div>
        ))}
      { isloading && 
          <Loader/>
      }
    
      </section>

      <Footer />
    </>
  );
};

export default Home;