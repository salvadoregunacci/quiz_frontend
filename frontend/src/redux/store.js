import {configureStore} from "@reduxjs/toolkit";
import generalSlice from "./slices/generalSlice.js";
import authSlice from "./slices/userSlice.js";
import categorySlice from "./slices/categorySlice.js";
import shopSlice from "./slices/shopSlice.js";

export const store = configureStore({
    reducer: {
        general: generalSlice,
        auth: authSlice,
        cats: categorySlice,
        shop: shopSlice,
    }
});