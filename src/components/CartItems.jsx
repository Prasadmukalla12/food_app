import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { removeFromCart } from "../Redux/slicer/slicer"


export default function CartItems(){

    const products = useSelector(state=>state.products)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function cartRemoveClick(product){
         dispatch(removeFromCart(product))
    }

    useEffect(()=>{
        if(products.length===0){
            Swal.fire({
               icon : "error",
               text : "No Cart items found"
               
            })
            navigate("/dashboard")
        }
    },[products,navigate])

    return(
        (products.length>=1)?
        <section>
            <Link to="/dashboard" className="font-semibold text-xl text-blue-500 bi bi-arrow-left">Back to food</Link>
            <div className=" flex justify-center items-center">
            
            <div className="sm:p-5 w-1/2">
              {
                products.map((product)=>
                  <div className=" flex border-2 p-3 w-56  md:w-xl lg:w-2xl flex-col sm:flex-row mt-5 sm:gap-5" key={product.id}>
                    <div className="">
                        <img src={product.image} className="w-44  h-40" />
                    </div>
                    <div className="">
                        <p className="font-bold text-2xl">{product.title}</p>
                        <p className="font-bold text-3xl mt-5 sm:mt-2">{product.price.toLocaleString("en-in",{style:"currency",currency:"INR"})}</p>
                        <p className="mt-5 sm:mt-2"><button onClick={()=>{cartRemoveClick(product)}} className="border-2 border-amber-400 rounded-3xl py-2 px-7">Remove</button></p>
                    </div>
                  </div>
                )
              }
            </div>
        </div> 
        </section>: 
        <section>
            
        </section>
        
    )
}