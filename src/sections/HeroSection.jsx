import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../EntryPonints/Login";


export default function HeroSection(){

  const[showLogin,setShowLogin] = useState(false)

  function handleOrderClick(){
    setShowLogin(true)
  }

    return(
        <section>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2">


          <div className="  p-3 mt-2 lg:ml-30 md:ml-10 md:mt-30">
            <div>
              <p className="text-4xl mb-3.5 font-bold bg-linear-to-r from-orange-500 to-orange-300 animate-pulse bg-clip-text text-transparent">Order Tasty Food</p>
              <p className="text-4xl text-red-500 font-bold">anytime !</p>
            </div>
            <div className="mt-5">
              <p className="text-gray-500 font-serif">order your food and enjoy our fastest & delicious order</p>
            </div>
            <div className="mt-8 flex justify-start items-center">
              <button onClick={handleOrderClick} className="px-5 py-2 mr-8 hover:bg-orange-500 active:scale-95 bg-orange-400 font-semibold rounded-4xl">Order now</button>
              <Link to="/menu" className="font-bold active:translate-x-0.5 underline text-blue-500">See menu</Link>
            </div>
          </div>

          
          <div className=" p-3 mt-2 md:ml-10 md:mt-30 md:mr-0">
            <img src="./HeroSectionMeal.png"className="md:h-70 sm:ml-5 md:ml-10"  />
          </div>


        </div>
        {
          showLogin && <Login setShowLogin = {setShowLogin} />
        }
    </section>
    )
}