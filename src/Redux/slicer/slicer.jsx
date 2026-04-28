import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    products : [],
    productsCount : 0
}


const productSlicer = createSlice({
    name : "productSlicer",
    initialState,
    reducers : {
        addToCartItems : (state,action)=>{
            state.products.push(action.payload)
            state.productsCount = state.products.length
        }
    }
})

export const {addToCartItems} = productSlicer.actions
export default productSlicer.reducer