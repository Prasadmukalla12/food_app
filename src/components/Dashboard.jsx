import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCartItems } from "../Redux/slicer/slicer";



export default function Dashboard(){

    const [cookie,setCookie,removeCookie] = useCookies(["user-id"])
    const [items,setItems] = useState({})
    const [categories,setCategories] = useState([])
    const [location,setLoaction] = useState("")
    const [selectCategory,setSelectCategory] =useState("all")
    const [searchText,setSearchText] = useState("")
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const productsCount = useSelector((state)=>state.productsCount)


    // Loading Products
    const LoadItems = useCallback(()=>{
        axios.get("/item.json")
        .then(res=>
            setItems(res.data)
        )
    },[])

    // Loading Categories
    const LoadCategories = useCallback(()=>{
        axios.get(`/item.json`)
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


    //  When LogoutClick
    function LogoutClick(){
        removeCookie("user-id")
        navigate("/")
    }

    // Category Access
    function handleCategoryClick(category){
        setSelectCategory(category)
    }
 

    // Filter products
    const filterProducts = useMemo(() => {
      let result = []

    if (selectCategory === "all") {
        result = Object.values(items).flat()
    } else {
        result = items[selectCategory] || []
    }

    if (searchText) {
        result = result.filter(item =>
            item.title.toLowerCase().includes(searchText.toLowerCase())
        )
    }

       return result

     }, [items, selectCategory, searchText])
    


    // Show All Products when All click
    function handleAllClick(){
        setSelectCategory("all")
    }


    // Item added into to Cart
    function AddToCartClick(item){
        dispatch(addToCartItems(item))
    }

    // CartItems
    function handleCartClick(){
        navigate("/cart")
    }



    useEffect(()=>{
        if(!cookie["user-id"]){
            navigate("/")
        }else{
            setLoading(true)
        const timer =  setTimeout(()=>{
            LoadItems()
            LoadCategories()
            FindLocation()
            setLoading(false)
          },1000)

          return ()=>
            clearTimeout(timer)
          
        }
        
    },[])

    return(
        (loading) ? 

        // Before data Loading page
        <section className="backdrop-blur-lg animate-pulse">
            <div className="m-3 h-10 rounded-md bg-gray-400 ">
               
            </div>
            
            {/* Header Section */}
            <div className="bg-gray-400 m-3 h-20  p-3 flex justify-between items-center">
              
            </div>

            {/* Loading Categories */}

              <div className="p-3 mt-5 mx-3 bg-gray-400  h-8">
                
              </div>

            {/* Loading Products */}

            <main className="flex flex-wrap flex-row sm:p-10 md:p-0 mt-10 gap-10 ">
                
                  <div className="h-fit ml-10 md:ml-10 lg:ml-0 w-80">
                    <div className="h-48 rounded-md bg-gray-400 w-full"></div>
                    <div className="h-fit">
                        <p className="w-full rounded-md bg-gray-400 mt-3 h-8"></p>
                        <p className="w-full rounded-md bg-gray-400 mt-3 h-5"></p>
                        <p className="bg-gray-400 rounded-md mt-0.5 h-5 w-3/4"></p>
                        <p className=" bg-gray-400 rounded-md mt-0.5 h-5 w-2/3"></p>
                        <p className="bg-gray-400 rounded-md mt-3 h-7 w-1/2"></p>
                        <p className=" bg-gray-400 rounded-md mt-3 h-5 w-2/3"></p>
                    </div>
                  </div>   

                  <div className="h-fit ml-10 md:ml-10 lg:ml-0 w-80">
                    <div className="h-48 rounded-md bg-gray-400 w-full"></div>
                    <div className="h-fit">
                        <p className="w-full rounded-md bg-gray-400 mt-3 h-8"></p>
                        <p className="w-full rounded-md bg-gray-400 mt-3 h-5"></p>
                        <p className="bg-gray-400 rounded-md mt-0.5 h-5 w-3/4"></p>
                        <p className=" bg-gray-400 rounded-md mt-0.5 h-5 w-2/3"></p>
                        <p className="bg-gray-400 rounded-md mt-3 h-7 w-1/2"></p>
                        <p className=" bg-gray-400 rounded-md mt-3 h-5 w-2/3"></p>
                    </div>
                  </div>   

                  <div className="h-fit ml-10 md:ml-10 lg:ml-0 w-80">
                    <div className="h-48 rounded-md bg-gray-400 w-full"></div>
                    <div className="h-fit">
                        <p className="w-full rounded-md bg-gray-400 mt-3 h-8"></p>
                        <p className="w-full rounded-md bg-gray-400 mt-3 h-5"></p>
                        <p className="bg-gray-400 rounded-md mt-0.5 h-5 w-3/4"></p>
                        <p className=" bg-gray-400 rounded-md mt-0.5 h-5 w-2/3"></p>
                        <p className="bg-gray-400 rounded-md mt-3 h-7 w-1/2"></p>
                        <p className=" bg-gray-400 rounded-md mt-3 h-5 w-2/3"></p>
                    </div>
                  </div>   

                  <div className="h-fit ml-10 md:ml-10 lg:ml-0 w-80">
                    <div className="h-48 rounded-md bg-gray-400 w-full"></div>
                    <div className="h-fit">
                        <p className="w-full rounded-md bg-gray-400 mt-3 h-8"></p>
                        <p className="w-full rounded-md bg-gray-400 mt-3 h-5"></p>
                        <p className="bg-gray-400 rounded-md mt-0.5 h-5 w-3/4"></p>
                        <p className=" bg-gray-400 rounded-md mt-0.5 h-5 w-2/3"></p>
                        <p className="bg-gray-400 rounded-md mt-3 h-7 w-1/2"></p>
                        <p className=" bg-gray-400 rounded-md mt-3 h-5 w-2/3"></p>
                    </div>
                  </div>   

                  <div className="h-fit ml-10 md:ml-10 lg:ml-0 w-80">
                    <div className="h-48 rounded-md bg-gray-400 w-full"></div>
                    <div className="h-fit">
                        <p className="w-full rounded-md bg-gray-400 mt-3 h-8"></p>
                        <p className="w-full rounded-md bg-gray-400 mt-3 h-5"></p>
                        <p className="bg-gray-400 rounded-md mt-0.5 h-5 w-3/4"></p>
                        <p className=" bg-gray-400 rounded-md mt-0.5 h-5 w-2/3"></p>
                        <p className="bg-gray-400 rounded-md mt-3 h-7 w-1/2"></p>
                        <p className=" bg-gray-400 rounded-md mt-3 h-5 w-2/3"></p>
                    </div>
                  </div>   
                
            </main>
        </section>  :    

        
        // Data rendering
        <section>

            {/* Back button */}
            <div className="p-3">
                <button className="bg-black py-2 w-full font-bold text-white" onClick={LogoutClick}>Logout</button>
            </div>

            
            {/* Header Section */}
            <div className="bg-orange-200 p-3 flex justify-between items-center">
              <div>
                <p>Delivered by</p>
                <p className="font-bold bi bi-geo-alt-fill">
                    {
                        (location) ? <span>{location}</span> : <span className=" ml-2 h-5 w-5 inline-block rounded-full border-2 border-black  border-t-transparent animate-spin"></span>
                    }
                </p>
              </div>
              <div>
                <input type="text" placeholder="Search items..." onChange={(e)=>setSearchText(e.target.value)} name="itemName" className="py-1 pl-1 focus:outline-blue-200 focus:outline-4 rounded-md bg-white" />
              </div>
              <div>
                <button onClick={handleCartClick} className="bi bi-cart-check-fill px-3 border-2 border-orange-400 bg-orange-400 rounded-md relative"><span className="bg-red-600 text-white h-4 w-4 text-xs -top-2 -right-2 rounded-full font-bold absolute ">{productsCount}</span></button>
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

            <main className="flex flex-wrap flex-row sm:p-10 md:p-0 mt-10 gap-10 bg-orange-100">
                {
                    
                      filterProducts.map((item,i)=>
                     <div className="w-80 shadow-2xl bg-white rounded-xl ml-10  md:ml-10 lg:ml-0 h-fit flex flex-col justify-between" key={item.id}>
                        <div className="p-2 h-64 relative">
                            <button onClick={()=>{AddToCartClick(item)}} className="bg-orange-500 font-semibold absolute -bottom-1.5 left-24  rounded-2xl px-7 py-1">ADD</button>
                            <img src={item.image} className="rounded-md h-full  w-full"  />
                        </div>
                        <div className="p-2 h-52">
                            <p className="text-2xl font-bold">{item.title}</p>
                            <p className="text-gray-500 font-semibold text-sm">{item.subtitle}</p>
                            <p className="font-extrabold my-3 text-3xl">{item.price.toLocaleString("en-in",{style:"currency",currency:"INR"})}/-</p>
                            <span className="border-2 bg-black text-white rounded-md px-3 bi bi-star-fill mr-2 font-bold"><span className="pl-1">{item.rating}</span></span>
                            <span  className="bi bi-person">{item.count}</span>
                        </div>
                     </div>
                    )
                    
                }
            </main>
        </section>
    )
}