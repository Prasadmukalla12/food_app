


export default function FeautersSection(){


    return(
        <section className="bg-orange-200">
         <h2 className="text-center mt-15 p-2 font-bold text-3xl">Explore our Feauters</h2>
        <div className=" grid grid-cols-1 gap-20 p-10 sm:grid-cols-2 lg:grid-cols-4">
           

          <div className="bg-white p-4">
            <img src="./veg.png" className="w-full" />
            <div className="border-t">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, nobis illo rerum voluptatem dolores.</p>
            </div>
          </div>


          <div className="bg-white p-4">
            <img src="./seafood.png" className="w-full" />
            <div className="border-t">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, nobis illo rerum voluptatem dolores.</p>
            </div>
          </div>


          <div className="bg-white p-4">
            <img src="./desert.png" className="w-full" />
            <div className="border-t">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, nobis illo rerum voluptatem dolores.</p>
            </div>
          </div>


          <div className="bg-white p-4">
            <img src="./appelizer.png" className="w-full" />
            <div className="border-t">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, nobis illo rerum voluptatem dolores.</p>
            </div>
          </div>


        </div>
        </section>
    )
}