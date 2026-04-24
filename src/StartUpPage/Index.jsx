
import { lazy, useEffect } from "react";
import { Suspense } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const HeaderSection = lazy(()=>import("../sections/HeaderSection"))
const HeroSection = lazy(()=>import("../sections/HeroSection"))
const FeautersSection = lazy(()=>import("../sections/FeautesSection"))
const Discounts = lazy(()=>import("../sections/Discount"))
const FooterSection = lazy(()=>import("../sections/Footer"))

export default function HomePage() {

  const [cookie,setCookie,removeCookie] = useCookies(['user-id'])
  const navigate = useNavigate()

  useEffect(()=>{
    if(cookie['user-id']){
      navigate("/dashboard")
    }
  },[cookie])

  return (
    <>
     <Suspense fallback={<div className="h-screen flex justify-center gap-2 items-center">
          <div className="border-4 border-gray-400 border-t-transparent w-11 rounded-full h-11 animate-spin"></div>
          <h1 className="text-center text-gray-400 p-2 text-3xl font-bold">
             Please wait...
          </h1>
           </div>}>

       <HeaderSection/>
       <HeroSection/>
       <FeautersSection />
       <Discounts/>
       <FooterSection/>
     </Suspense>
   </>
  );
}