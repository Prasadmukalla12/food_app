import { lazy, useState } from "react"
const Login = lazy(()=>import("../EntryPonints/Login"))


export default function HeaderSection(){

  const [showLogin,setShowLogin] = useState(false)

  function handleLoginClick(){
    setShowLogin(true)
  }

    return(
        <header className=" bg-linear-to-r from-orange-200 to-orange-100  p-4 relative">
    
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-orange-500 ml-5 sm:ml-16 lg:ml-20 sm:text-xl md:text-4xl font-bold italic">Delicious</h1>

        <button className=" bg-orange-500 hover:bg-orange-600 active:scale-95 text-gray-200 font-bold px-5 py-2 rounded-xl"
        onClick={handleLoginClick}
        >
          Login
        </button>
        {showLogin && <Login setShowLogin={setShowLogin} />}
        </div>
    </header>
    )
}