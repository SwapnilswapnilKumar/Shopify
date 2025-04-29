import React, { useState,useEffect } from "react";
import cross_icon from '../Assets/cross_icon.png';
import './ListProduct.css'

const ListProduct = ()=>{
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = ()=>{
        fetch('https://shopify-8ns5.onrender.com/allproducts')
        .then((res)=>res.json())
        .then((data)=>setAllProducts(data))
    }

    useEffect(()=>{
        fetchInfo();
    },[]);

    const removeProduct = async (id)=>{
        await fetch('https://shopify-8ns5.onrender.com/removeproduct',{
            method:"POST",
            headers:{
                Accept: 'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id : id}),
        })
        fetchInfo()
    }

    return(
        <div className="listproduct">
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p> <p>Title</p> <p>Old Price</p> <p>New Price</p> <p>Category</p> <p>Remove</p>

            </div>

            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((item,index) => (
                    <div key={index}>
                        <div className="listproduct-format-main listproduct-format">
                            <img className="listproduct-product-icon" src={`${item.image}`} alt="" />
                            <p className="cartitems-product-title" >{item.name}</p>
                            <p>{item.old_price}</p>
                            <p>{item.new_price}</p>
                            <p>{item.category}</p>
                            <img className="listproduct-remove-icon" onClick={()=>{removeProduct(item.id)}} src={cross_icon} alt="cross_icon" />
                        </div>
                    </div>
                ))
                    
                }

            </div>

        </div>
    )
}


export default ListProduct;