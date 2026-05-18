import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import API_URL from "../api";

const Products = () => {
    const [products,setProducts] = useState([])
    const [viewDetails,setViewDetails] = useState(false)
    const [productData,setProductData] = useState({})
    const [quantity,setQuantity] = useState(1)   // ✅ NEW

    function fetchProducts(){
        axios.get(`${API_URL}/products`)
        .then(x=>setProducts(x.data))
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    function handleView(id){

        setQuantity(1)   // ✅ reset quantity
        axios.get(`${API_URL}/products/${id}`)
        .then(x=>{
            setProductData(x.data)
            setViewDetails(true)
            console.log(x.data)
        })
        .catch(err=>console.log(err))
    }

    // ✅ ADD TO CART FUNCTION
    function handleAddToCart(){
        const user = JSON.parse(localStorage.getItem("user"))

        if(!user || !user._id){
            alert("Please login first")
            return
        }

        axios.post(`${API_URL}/add-to-cart`,{
            user_id: user._id,
            product_id: productData.id,
            quantity: quantity
        })
        .then(res=>{
            setViewDetails(false)
            alert(res.data.message)
        })
        .catch(err=>console.log(err))
    }

  return (
    <>
        <Nav/>

        <div style={{margin:'80px 50px'}} className="products">
            {
                products.map((product)=>(
                    <div className="product-card" key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.image} alt="" height={'200px'} width={'200px'} />
                        <p><b>Price: </b>₹{product.price}</p>

                        {/* ✅ STOCK DISPLAY */}
                        <p style={{color: product.stock > 0 ? "green" : "red"}}>
                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </p>

                        <button onClick={()=>handleView(product.id)}>
                            View Details
                        </button>
                    </div>
                ))
            }
        </div>

        {
        viewDetails && 
        <div className="overlay">
            <div className="modal">
                <button className='cls-btn' onClick={()=>setViewDetails(false)}>X</button>

                <h2>{productData.title}</h2>
                <img src={productData.image} alt="" height={'200px'}/>
                <p><b>Price: </b>₹{productData.price}</p>
                <p><b>Description:</b> {productData.description}</p>

                {/* ✅ STOCK */}
                <p className='stock'>
                    {productData.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>

                {/* ✅ QUANTITY SELECTOR */}
                <div style={{marginTop:"10px"}}>
                    <button onClick={()=>setQuantity(q => q > 1 ? q-1 : 1)}>-</button>
                    <span style={{margin:"0 10px"}}>{quantity}</span>
                    <button onClick={()=>setQuantity(q => q+1)}>+</button>
                </div>

                {/* ✅ ADD TO CART BUTTON */}
                <button 
                    onClick={handleAddToCart}
                    disabled={productData.stock === 0}
                    style={{marginTop:"15px"}}
                >
                    Add to Cart
                </button>

            </div>
        </div>
        }

        <Footer/>
    </>
  )
}

export default Products