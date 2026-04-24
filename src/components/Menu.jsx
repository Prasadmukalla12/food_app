import { Link } from "react-router-dom";



export default function Menu(){

    return(
        <section>
            <div className="m-3 p-3 active:-translate-x-0.5 ">
               <span className="bi bi-arrow-left text-blue-500"><Link to="/" className="text-blue-500 underline font-bold">Back to page</Link></span> 
            </div> 
            <div className="flex justify-center mt-20 sm:mt-10 lg-mt-10 items-center">     
                <h2 className="bg-black rounded-tl-full rounded-br-full text-white p-5 font-bold text-3xl text-center w-3/4 sm:w-1/4">Menu</h2>
                
            </div>


            <div className=" grid grid-cols-1 h-screen  md:grid-cols-2">

            {/* First paper */}
            <div className="m-3 text-xs h-2/3 p-5 sm:p-5 border-gray-300 flex flex-wrap flex-col  shadow-2xl">


               {/* firstItem */}
               <div className="sm:p-5 w-1/2 p-2">
                <h2 className="bg-black text-center text-sm w-auto font-bold text-white rounded-4xl p-1">Appetizer</h2>
                <div className="my-3 felx flex-col font-bold">
                    <div className="flex felx-row justify-between items-center">
                        <p>Stuffed Mushroom</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Boiled Shrimp</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Delived Potatoes</p>
                        <p>$10</p>
                    </div>
                </div>
               </div>

               <div className="sm:p-5 w-1/2 p-2">
                
                <div className="my-3 felx flex-col font-bold">
                    <div className="flex felx-row justify-between items-center">
                        <p>Chicken Pasta</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Roast Chicken</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Spaghetti Bologenese</p>
                        <p>$10</p>
                    </div>
                </div>
               </div>


                {/* second item */}
               <div className="sm:p-5 w-1/2 p-2">
                <h2 className="bg-black text-center text-sm w-auto font-bold text-white rounded-4xl p-1">Side Dish</h2>
                <div className="my-3 felx flex-col font-bold">
                    <div className="flex felx-row justify-between items-center">
                        <p>Grilled asparagus</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Cabbage Casserole</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Creamed Corn</p>
                        <p>$10</p>
                    </div>
                </div>
               </div>

               <div className="sm:p-5 w-1/2 p-2">
                <div className="my-3 felx flex-col font-bold">
                    <div className="flex felx-row justify-between items-center">
                        <p>Caprese salad</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Baked Brie Bites</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Yeast rolls</p>
                        <p>$10</p>
                    </div>
                </div>
               </div>


               {/* Third Item */}
               <div className="sm:p-5 w-1/2 p-2">
                <h2 className="bg-black text-sm w-auto font-bold text-white rounded-4xl p-1">Main Course</h2>
                <div className="my-3 felx flex-col font-bold">
                    <div className="flex felx-row justify-between items-center">
                        <p>Vegetable Lasanga</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Turkish Fish Stew</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Grilled Pizza</p>
                        <p>$10</p>
                    </div>
                </div>
               </div>

            </div>

            {/* second paper */}
            <div className="m-3 text-xs h-2/3 p-5 sm:p-5 border-gray-300 flex flex-wrap flex-col  shadow-2xl">


               {/* firstItem */}
               <div className="sm:p-5 w-1/2 p-2">
                <h2 className="bg-black text-center text-sm w-auto font-bold text-white rounded-4xl p-1">Desserts</h2>
                <div className="my-3 felx flex-col font-bold">
                    <div className="flex felx-row justify-between items-center">
                        <p>Stuffed Mushroom</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Boiled Shrimp</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Delived Potatoes</p>
                        <p>$10</p>
                    </div>
                </div>
               </div>

               <div className="sm:p-5 w-1/2 p-2">
                
                <div className="my-3 felx flex-col font-bold">
                    <div className="flex felx-row justify-between items-center">
                        <p>Chicken Pasta</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Roast Chicken</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Spaghetti Bologenese</p>
                        <p>$10</p>
                    </div>
                </div>
               </div>


                {/* second item */}
               <div className="sm:p-5 w-1/2 p-2">
                <h2 className="bg-black text-center text-sm w-auto font-bold text-white rounded-4xl p-1">Drinks</h2>
                <div className="my-3 felx flex-col font-bold">
                    <div className="flex felx-row justify-between items-center">
                        <p>Grilled asparagus</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Cabbage Casserole</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Creamed Corn</p>
                        <p>$10</p>
                    </div>
                </div>
               </div>

               <div className="sm:p-5 w-1/2 p-2">
                <div className="my-3 felx flex-col font-bold">
                    <div className="flex felx-row justify-between items-center">
                        <p>Caprese salad</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Baked Brie Bites</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Yeast rolls</p>
                        <p>$10</p>
                    </div>
                </div>
               </div>


               {/* Third Item */}
               <div className="sm:p-5 w-1/2 p-2">
                <h2 className="bg-black text-sm w-auto font-bold text-white rounded-4xl p-1">Biryani</h2>
                <div className="my-3 felx flex-col font-bold">
                    <div className="flex felx-row justify-between items-center">
                        <p>Vegetable Lasanga</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Turkish Fish Stew</p>
                        <p>$10</p>
                    </div>
                    <div className="flex felx-row justify-between items-center">
                        <p>Grilled Pizza</p>
                        <p>$10</p>
                    </div>
                </div>
               </div>

            </div>


        </div>

        </section>
    )
}