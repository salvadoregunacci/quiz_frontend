import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios.js";

const initialState = {
    status: "loading",
    categories: [],
    activeCatId: null,
};

export const fetchCats = createAsyncThunk("cat/fetchCats", async (_, {rejectWithValue}) => {
    try {
        const res = await axios.get("/category");

        return res.data;
    } catch (err) {
        return rejectWithValue({
            err
        });
    }
});

const categorySlice = createSlice({
    name: "cat",
    initialState,
    reducers: {
        setActiveCat: (state, action) => {
            state.activeCatId = action.payload;
        }
    },
    extraReducers: {
        [fetchCats.pending]: (state) => {
            state.status = "loading";
        },
        [fetchCats.fulfilled]: (state, action) => {
            state.status = "complete";
            state.categories = action.payload
        },
        [fetchCats.rejected]: (state, action) => {
            console.log(action.payload);
        }
    }
});

export default categorySlice.reducer;
export const {setActiveCat} = categorySlice.actions;