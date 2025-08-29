import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './cartslice'
import listReducer from './wishlist'
import orderReducer from './order'

const store = configureStore({
    reducer:{
        cart:cartReducer,
        list:listReducer,
        order:orderReducer
    },
})       


export default store