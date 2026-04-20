import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
const AddProduct = () => {
    const [productName,setProductName] = useState('')
    const [imageLink,setImageLink] = useState('')

    const product ={productName,imageLink}
    function handleAdd(){
        axios.post('http://localhost:3000/products',product)
        .then(()=>{
            console.log('Added successfully')
        })
        .catch(err=>console.log(err))
    }
    

  return (
    <>
      <h1>Add a product</h1>
      <input type="text" placeholder="Enter product category name" value={productName} onChange={e=>setProductName(e.target.value)} required/>

      <input type="text" placeholder="Enter image link" value={imageLink} onChange={e=>setImageLink(e.target.value)} required/>

      <button onClick={handleAdd}>Add</button>
    </>
  );
};

export default AddProduct;