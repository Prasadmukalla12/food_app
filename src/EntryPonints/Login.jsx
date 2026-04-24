import axios from "axios"
import { useFormik } from "formik"
import { useCallback, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"


export default function Login({setShowLogin}){

    const [users,setUsers] = useState([{userID:"JordanWoaks",password : "Jordan@123"}])
    const navigate = useNavigate()
    const [cookie,setCookie,removeCookie] = useCookies(['user-id'])


    const handleCloseClick = ()=>{
        setShowLogin(false)
    }

    const handleBlurClick = ()=>{
        setShowLogin(false)
    }


    const formik = useFormik({
       initialValues : {
        userID : "",
        password : ""
       },
       onSubmit : (userDetails)=>{
         var result = users.find(user=>user.userID === userDetails.userID)
         if(result){
            if(result.password===userDetails.password){
                setCookie("user-id",userDetails.userID,{expires : new Date("2026-08-25")})
                navigate("/dashboard")
            }else{
                Swal.fire({
                    icon : "error",
                    title : "Invalid Password"
                })
            }
         }else{
            Swal.fire({
                    icon : "error",
                    title : "Invalid Password"
                })
         }
       }
    })

    return(
        <div className="fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-300">

            

            <div className="bg-black/40 backdrop-blur-sm inset-0 absolute"onClick={handleBlurClick}>
            
            <div className="font-bold text-white p-4">
                <p>Note: Use this Id and password</p>
                <p>ID : JordanWoaks</p>
                <p>Key : Jordan@123</p>
            </div>
            
            </div>


            <form onSubmit={formik.handleSubmit} className="w-80 z-10  bg-white/60 border-2 border-gray-200 rounded-xl p-3">
              
            <h2 className="bi bi-person-fill border-b-black font-bold text-2xl text-center border-b-2 pb-5 mb-3">User Login</h2>

            <div className="mb-4 p-2">
                <label className="font-bold">USER ID</label>
                <div className="mt-2">
                    <input onChange={formik.handleChange}  type="text" className="border-2 pl-0.5 py-2 focus:border-4  focus:border-blue-300 focus:outline-none w-full rounded-lg" name="userID" />
                </div>
            </div>


            <div className="mb-3 p-2" >
                <label className="font-bold">PASSWORD</label>
                <div className="mt-2">
                    <input onChange={formik.handleChange} type="password" className=" border-2 py-2 pl-0.5 rounded-lg focus:border-4 focus:border-blue-300 w-full focus:outline-none " name="password" />
                </div>
            </div>

            <div className="flex flex-col p-2">
                <button type="submit" className="bg-blue-500 active:scale-95  hover:cursor-grab hover:bg-blue-600 py-2 rounded-3xl font-bold text-white px-5 w-full">
                    Login
                </button>
                <button type="button" onClick={handleCloseClick} className="mt-2 active:scale-95 font-bold underline">Close</button>
            </div>
        </form>
        </div>
    )
}