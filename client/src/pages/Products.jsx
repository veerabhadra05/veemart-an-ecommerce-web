import React,{ useState } from 'react'
import { useEffect } from "react"
import axios from 'axios'
import Nav from '../components/Nav'
const Products = () => {
    const [products,setProducts] = useState([])
    const [viewDetails,setViewDetails] = useState(false)
    const [productData,setProductData] = useState({})

    function fetchProducts(){
        axios.get("http://localhost:5000/products")
        .then(x=>{setProducts(x.data)
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        fetchProducts()
        
    },[])

    function handleView(id){
        setViewDetails(true)
        axios.get(`http://localhost:5000/products/${id}`)
        .then(x=>{
            setProductData(x.data)
        })
        .catch(err=>console.log(err))
    }
       
    
  return (
    <>
        <Nav/>

        <div className="products">
            {
                products.map((product)=>{
                    return <div className="product-card" key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.image} alt="" height={'200px'} />
                        <p><b>Price: </b>₹{product.price}</p>
                        <button onClick={()=>handleView(product.id)}>View Details</button>
                    </div>
                })
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
            <p className='stock'>{productData.stock>0 ? 'In Stock' : 'Out of Stock'}</p>
                
            </div>
        </div>
        }
    </>
  )
}

export default Products