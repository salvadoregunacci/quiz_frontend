import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios.js";

const STATUS_DEFAULT = "default";
const STATUS_LOADING = "loading";
const STATUS_COMPLETE = "complete";

const initialState = {
    items: [],
    status: STATUS_DEFAULT
}

export const getItems = createAsyncThunk("shop/getItems", async (_, {rejectWithValue}) => {
    try {
        const {data} = await axios.get("/items");

        return data;
    } catch (err) {
        return rejectWithValue(err);
    }
});

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {

    },
    extraReducers: {
        [getItems.pending]: (state) => {
            state.status = STATUS_LOADING;
        },
        [getItems.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = STATUS_COMPLETE;
        },
        [getItems.rejected]: (state, action) => {
            state.status = STATUS_DEFAULT;
            console.error(action.payload);
        },
    }
});

export default shopSlice.reducer;