import React, { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

        
const Home = () => {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [visible,setVisible] = useState(false)
  const navigate = useNavigate()



  function fetchData() {
    axios.get("http://localhost:3000/products")
      .then(x => {
        setProducts(x.data);
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    fetchData()
  }, [])

  


  const filteredPro = products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  )

  function navigateAdd(e) {
    e.preventDefault()
    setVisible(true)
    navigate('/addproduct')
  }

  return (
    <>
      <Nav />
      <section className="welcome">
        <h1>Welcome to
          <span> Cartify 🛒</span>
        </h1>

        <h2>Discover the best products at unbeatable prices</h2>
        <button>Shop now</button>
      </section>

      <div className="search">

        <h2 style={{ textAlign: 'center', color: 'orangeRed', margin: '10px 40px 40px 40%', fontSize: '35px' }}>Shop by Category</h2>

        <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      </div>

      <section className="product-categories">

        {filteredPro.map((product, index) => (

          <div key={index} className="image">
            <img src={product.imageLink} alt="" />
            <h3>{product.productName}</h3>
          </div>
        ))}

        <button onClick={navigateAdd}>ADD PRODUCT</button>
      </section>
      

      <Footer />
    </>
  );
};

export default Home;