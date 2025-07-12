import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    items:[]
}


const listslice = createSlice({
    name:'list',
    initialState,
    reducers:{
        setlistitems:(state,action)=>{
            state.items = action.payload
        }
    }
})

export const {setlistitems}=listslice.actions
export default listslice.reducer
