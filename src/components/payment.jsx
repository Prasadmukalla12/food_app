
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const Payment = ()=>{

    const CartProducts = useSelector(state=>state.products)
    const [couponVal,setCouponVal] = useState()
    const [couponDiscount,setCouponDiscount] = useState(0)
    const [msg,setMsg] = useState("")
    const navigate = useNavigate()

    let total = 0
     for(let item of CartProducts){
        total += item.price
     }

    const couponCode = "NEW2026"
    const DeliveryFee = 49

    let deliveyAmount = total + DeliveryFee

    let orderPlacedAmount = deliveyAmount - couponDiscount


    function handleCouponChange(e){
        setCouponVal(e.target.value)
    }

    function handleCouponClick(){
        if(couponVal === couponCode){
           const discountAmount = total * 0.1
           setCouponDiscount(discountAmount)
        }else{
           setMsg("Enter valid coupon")
        }
    }

    function handleContinueClick(){
        navigate("/gateway")
    }

    useEffect(()=>{
        if(!CartProducts){
            navigate("/dashboard")
        }
    },[])


    return(
        <>
          <section className="flex flex-col justify-center items-center">
            <div>
                <Link to="/cart"
                className="text-blue-500 font-bold active:translate-y-0.5">
                <span className="bi bi-arrow-left">
                    Back to cart
                </span>
                </Link>
            </div>
            <div>
                <h4 className="text-xl p-3 font-bold">Price Details</h4>

                {/* MRP values */}

                <div className="flex flex-col border-1 border-gray-300 p-3 p-1 w-80 rounded-md shadow-md">
                    <div className="flex flex-row justify-between">
                    <span>MRP (incl. of all taxes)</span>
                    <span>
                    {
                      total.toLocaleString("en-in",
                      {style:"currency",currency:"INR"})
                    }
                    </span>
                    </div>

                     {/* delivery Charges */}

                    <div className="flex justify-between my-2 items-center">
                    <span>Delivery Fee</span>
                    <span className="text-red-500">
                    {
                        DeliveryFee.toLocaleString("en-in",
                            {style:"currency",currency:"INR"})
                    }
                    </span>
                    </div>

                     {/* Coupon Input */}

                    <div>
                        <span>
                            <input type="text" 
                             name="couponValue"
                             placeholder="Enter coupon"
                             onChange={handleCouponChange}
                             className="border-2 border-blue-300 rounded-md focus:outline-none focus:border-2 border-blue-200" 
                            />
                            <button
                            onClick={handleCouponClick}
                             className="bg-yellow-400 py-0.5 hover:bg-yellow-500 rounded-md font-semibold px-2"
                            >Apply
                            </button>
                        </span>
                        <span className="block font-semibold text-red-500">
                            {
                                (couponDiscount)? " " : msg
                            }
                        </span>
                    </div>

                    {/* Coupon percentage */}

                    <div className="flex justify-between my-2 items-center pb-2">
                    <span>Coupon</span>
                    <span className="text-green-500">-{
                    couponDiscount.toFixed(2)
                    }</span>
                    </div>

                    {/* Total Amount */}

                    <div className="flex justify-between items-center border-t-2">
                    <span className="font-bold text-md">Order amount</span>
                    <span className="font-bold">
                       {orderPlacedAmount}
                    </span>
                    </div>

                </div>
                <div>
                    <button 
                    onClick={handleContinueClick}
                    className="bg-yellow-400 hover:bg-yellow-500
                     w-full py-2 mt-3 rounded-md font-semibold shadow-md"
                    >
                    Continue
                    </button>
                </div>
                <span>*coupon - NEW2026</span>
            </div>
          </section>
        </>
    )
}

export default React.memo(Payment)