import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './cartslice'
import listReducer from './wishlist'

const store = configureStore({
    reducer:{
        cart:cartReducer,
        list:listReducer
    },
})       


export default store