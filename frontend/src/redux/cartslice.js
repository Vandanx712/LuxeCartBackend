import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    items:[]
}

console.log(initialState)

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addtocart:(state,action)=>{
            const item = action.payload
            const existingitem= state.items.find(i=>i.pid === item.pid && i.vid === item.vid)

            if(existingitem) existingitem.qty += item.qty
            else state.items.push(item)
        }, 
        removefromcart:(state,action)=>{
            const {pid,vid} =action.payload
            state.items = state.items.filter(item => !(item.pid === pid && item.vid === vid))
        },
        updatequantity:(state,action)=>{
            const {pid,vid,qty} = action.payload
            const item = state.items.find(i=>i.pid === pid && i.vid === vid)
            if(item) item.qty += qty
        },
        clearcart:(state,action)=>{
            state.items = []
        },
        setcartitems:(state,action)=>{
            state.items = action.payload
        }
    }
})

export const {addtocart ,removefromcart, updatequantity, clearcart,setcartitems} =cartSlice.actions
export default cartSlice.reducer