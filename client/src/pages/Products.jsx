import React,{ useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import API_URL from "../api";
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Loader2 from '../components/Loader2';
import Message from '../components/Message';

const Products = () => {
    const [products,setProducts] = useState([])
    const [viewDetails,setViewDetails] = useState(false)
    const [productData,setProductData] = useState({})
    const [quantity,setQuantity] = useState(1)  
    const [isloading,setIsloading] = useState(false)
    const [ismodalloading, setIsmodalloading] = useState(false)
    const [notification,setnotification] = useState(false)
    const [notifymsg,setnotifymsg] = useState('')
    const { category } = useParams()

    function fetchProducts(){
        setIsloading(true)
        axios.get(`${API_URL}/products`)
        .then(x=>{
            setIsloading(false)
            setProducts(x.data)
        })
        .catch(err=>{
            setIsloading(false)
            console.log(err)
        })
    }

    function fetchCategorizedProducts(){
        setIsloading(true)
        axios.get(`${API_URL}/products/category/${category}`)
        .then((res)=>{
            setProducts(res.data)
            setIsloading(false)
        })
        .catch((err)=>{
            console.log(err)
            setIsloading(false)
        })
    }

    useEffect(()=>{
        if(category){
            fetchCategorizedProducts();
        }
        else{
            fetchProducts()
        }
    },[])

    
    function handleView(id){
        setIsmodalloading(true)
        setQuantity(1)   //reset quantity
        axios.get(`${API_URL}/products/${id}`)
        .then(x=>{
            setIsmodalloading(false)
            setProductData(x.data)
            setViewDetails(true)
        })
        .catch(err=>{
            setIsmodalloading(false)
            console.log(err)})
    }

    // ADD TO CART FUNCTION
    function handleAddToCart(){
        const user = JSON.parse(localStorage.getItem("user"))
        if(!user || !user._id){
            setnotification(true)
            setnotifymsg('Please Login !')
            setTimeout(() => {
                setnotification(false)
                setnotifymsg('')
            }, 3000);
            setViewDetails(false)
            return
        }
        setIsmodalloading(true)

        axios.post(`${API_URL}/add-to-cart`,{
            user_id: user._id,
            product_id: productData.id,
            quantity: quantity
        })
        .then(res=>{
            setIsmodalloading(false)
            setViewDetails(false)
            toast.success(res.data.message)
        })
        .catch(err=>console.log(err))
    }

  return (
    <>
        <Nav/>

        <h1 className='products-heading'>Our Products</h1>
        <div className="products">
            {
                products.map((product)=>(
                    <div className="product-card" key={product.id}>
                        <h3>{product.title}</h3>
                        {product.image ? <img src={`${product.image}`} alt="product image" height={'200px'} width={'200px'} loading='lazy' decoding='async' /> : <ImageLoader/>}
                        <p><b>Price: </b>₹{product.price}</p>

                        {/*STOCK DISPLAY */}
                        <p style={{color: product.stock > 0 ? "green" : "red"}}>
                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </p>

                        <button onClick={()=>handleView(product.id)}>
                            View Details
                        </button>
                    </div>
                ))
            }
            {ismodalloading && <Loader2/>}
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

                {/* STOCK */}
                <p className='stock' style={{color:productData.stock>0 ? 'green' : 'red'}}>
                    {productData.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    
                </p>

                {/*QUANTITY SELECTOR */}
                <div style={{marginTop:"10px"}}>
                    <button className='quantity-btns' onClick={()=>setQuantity(q => q > 1 ? q-1 : 1)}>-</button>
                    <span style={{margin:"0 10px"}}>{quantity}</span>
                    <button className='quantity-btns' onClick={()=>setQuantity(q => q+1)}>+</button>
                </div>

                {/*ADD TO CART BUTTON */}
                <button 
                    className='cart-btn'
                    onClick={handleAddToCart}
                    disabled={productData.stock === 0}
                    style={{marginTop:"15px"}}
                >
                    Add to Cart
                </button>

            </div>
            {
            ismodalloading && <Loader/>
        }
        </div>
        
        }

        { isloading &&
            <Loader2/>
        }
        {
            notification && <Message message={notifymsg}/>
        }
        <Footer/>
    </>
  )
}

export default Products