import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";



export default function Dashboard(){

    const [cookie,setCookie,removeCookie] = useCookies(["user-id"])
    const navigate = useNavigate()
    const [items,setItems] = useState({})

    function LoadItems(){
        axios.get("../../public/item.json")
        .then(res=>{
            console.log(res.data)
            setItems(res.data)}
        )
    }


    function LogoutClick(){
        removeCookie("user-id")
        navigate("/")
    }

    useEffect(()=>{
        if(!cookie["user-id"]){
            navigate("/")
        }
        LoadItems()
    },[cookie])

    return(
        <section>
            <div className="p-3">
                <button className="bg-black py-2 w-full font-bold text-white" onClick={LogoutClick}>Logout</button>
            </div>
            <div className="bg-orange-200 p-3">
              <div>
                {
                    Object.keys(items).map(item=>{
                        Object.keys(items[item]).map(product=>{
                            console.log(product)
                        })
                    })
                }
              </div>
              <div></div>
              <div></div>
            </div>
        </section>
    )
}