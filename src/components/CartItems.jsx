import { useSelector } from "react-redux"


export default function CartItems(){

    const products = useSelector(state=>state.products)
    const productsCount = useSelector(state=>state.productsCount)


    return(

        <div className="">
            <h2>CartItems</h2>
            
        </div>
    )
}