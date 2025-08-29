import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[],
    price:0
}

const orderslice = createSlice({
    name:'order',
    initialState,
    reducers:{
        setorderitems:(state,action)=>{
            state.items = action.payload
        },
        settotalprice:(state,action)=>{
            state.price = action.payload
        }
    }
})

export const {setorderitems,settotalprice} = orderslice.actions
export default orderslice.reducer