import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    products : [],
    productsCount : 0
}


const productSlicer = createSlice({
    name : "productSlicer",
    initialState,
    reducers : {
        clearCart : () => initialState,
        addToCartItems : (state,action)=>{
            state.products.push(action.payload)
            state.productsCount = state.products.length
        },
        removeFromCart : (state,action)=>{
            state.products = state.products.filter(item=>item.id!==action.payload.id)
            state.productsCount = state.products.length
        }
    }
})

export const {addToCartItems, removeFromCart, clearCart} = productSlicer.actions
export default productSlicer.reducer
