import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/styles/App.css"
import { lazy, Suspense } from "react";

const HomePage = lazy(()=>import("./StartUpPage/Index"))
const Login = lazy(()=>import("./EntryPonints/Login"))
const Dashboard = lazy(()=>import("./components/Dashboard"))
const Menu = lazy(()=>import("./components/Menu"))
const CartItems = lazy(()=>import("./components/CartItems"))



export default function App(){

  return(
    <Suspense fallback={<div className="h-screen flex justify-center gap-2 items-center">
          <div className="border-4 border-gray-400 border-t-transparent w-11 rounded-full h-11 animate-spin"></div>
          <h1 className="text-center text-gray-400 p-2 text-3xl font-bold">
             Please wait...
          </h1>
           </div>}>
      <Routes>
         <Route path="/" element={<HomePage/>} />
         <Route path="/menu" element={<Menu />} />
         <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/cart" element={<CartItems />} />
      </Routes>
    </Suspense>
  )
}