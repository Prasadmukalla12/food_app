import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";



export default function Dashboard(){

    const [cookie,setCookie,removeCookie] = useCookies(["user-id"])
    const navigate = useNavigate()
    const [items,setItems] = useState({})
    const [categories,setCategories] = useState([])
    const [location,setLoaction] = useState("")
    const [selectCategory,setSelectCategory] =useState("all")
    const [searchText,setSearchText] = useState("")

    const LoadItems = useCallback(()=>{
        axios.get("../../public/item.json")
        .then(res=>
            setItems(res.data)
        )
    },[])


    const LoadCategories = useCallback(()=>{
        axios.get(`../../public/item.json`)
        .then(res=>{
            var result = res.data
            var category = Object.keys(result)
            setCategories(category)
    })
    },[])

    // Accessing City

    const FindLocation = useCallback(()=>{
        navigator.geolocation.getCurrentPosition((position) => {
         const lat = position.coords.latitude;
         const lon = position.coords.longitude;
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=09ecae0482a1446fa1670cd5af797a63`)
        .then(res=>res.json())
        .then(data=>{
         setLoaction(data.results[0].components.city)
      })
    });
    },[])



    function LogoutClick(){
        removeCookie("user-id")
        navigate("/")
    }

    function handleCategoryClick(category){
        setSelectCategory(category)
    }

    var filterProducts = []
    if(selectCategory==="all"){
        filterProducts = Object.values(items).flat()
    }else{
        filterProducts = items[selectCategory] || []
    }
    filterProducts = filterProducts.filter(item=>item.title.toLowerCase().includes(searchText.toLocaleLowerCase()))


    function handleAllClick(){
        setSelectCategory("all")
    }

    function AddToCartClick(item){
        console.log(item)
    }

    useEffect(()=>{
        if(!cookie["user-id"]){
            navigate("/")
        }
        LoadItems()
        LoadCategories()
        FindLocation()
    
    },[])

    return(
        <section>

            {/* Back button */}
            <div className="p-3">
                <button className="bg-black py-2 w-full font-bold text-white" onClick={LogoutClick}>Logout</button>
            </div>
            
            {/* Header Section */}
            <div className="bg-orange-200 p-3 flex justify-between items-center">
              <div>
                <p>Delivered by</p>
                <p className="font-bold bi bi-geo-alt-fill">{location}</p>
              </div>
              <div>
                <input type="text" placeholder="Search items..." onChange={(e)=>setSearchText(e.target.value)} name="itemName" className="py-1 pl-1 focus:outline-blue-200 focus:outline-4 rounded-md bg-white" />
              </div>
              <div>
                <button className="bi bi-cart-check-fill px-3 border-2 border-orange-400 bg-orange-400 rounded-md"></button>
              </div>
            </div>

            {/* Loading Categories */}

              <div className="p-3 mt-5 font-semibold bg-orange-300">
                <span className="px-2 border-2 hover:cursor-grab  hover:bg-orange-200 active:bg-orange-400 rounded-3xl mr-3" onClick={handleAllClick}>all</span>
                {
                    categories.map(category=>
                        <span className="px-2 border-2 hover:bg-orange-200 active:bg-orange-400  rounded-3xl hover:cursor-grab mr-3" onClick={()=>{handleCategoryClick(category)}} key={category}>{category}</span>
                    )
                }
              </div>

            {/* Loading Products */}

            <main className="flex flex-wrap flex-row mt-10 gap-10 bg-orange-100">
                {
                    
                      filterProducts.map((item,i)=>
                     <div className="w-80 shadow-2xl h-fit flex flex-col justify-between" key={item.id}>
                        <div className="p-2 h-64 relative">
                            <button onClick={()=>{AddToCartClick(item)}} className="bg-orange-500 absolute -bottom-1.5 left-24  rounded-2xl px-7 py-1">ADD</button>
                            <img src={item.image} className="rounded-md h-full  w-full"  />
                        </div>
                        <div className="p-2 h-52">
                            <p className="text-2xl font-bold">{item.title}</p>
                            <p className="text-gray-500 font-semibold text-sm">{item.subtitle}</p>
                            <p className="font-extrabold my-3 text-3xl">{item.price.toLocaleString("en-in",{style:"currency",currency:"INR"})}/-</p>
                            <span className="border-2 bg-green-300 rounded-md px-3 bi bi-star-fill mr-2 font-bold"><span className="pl-1">{item.rating}</span></span>
                            <span  className="bi bi-person">{item.count}</span>
                        </div>
                     </div>
                    )
                    
                }
            </main>
        </section>
    )
}