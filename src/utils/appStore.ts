import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import noteReducer from './noteSlice'
const appStore=configureStore({

    reducer:{
        user:userReducer,
        note:noteReducer,
        
    }

})

export default appStore;