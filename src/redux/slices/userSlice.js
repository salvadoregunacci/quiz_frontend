import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios.js";

const STATUS_DEFAULT = "default";
const STATUS_LOADING = "loading";
const STATUS_COMPLETE = "complete";

const initialState = {
    authUser: null,
    status: STATUS_DEFAULT,
    error: null,
    isAddCoins: false,
    isDecCoins: false,
    isNewAchievement: false,
    isUnlockCat: false,
    achievements: [],
    unlockCategories: [],
    items: [],
    allUsers: []
}

export const getAllUsers = createAsyncThunk("auth/getAllUsers", async ({sort, limit}, {rejectWithValue})=> {
    try {
        let query = "/users";

        if (sort) {
            query += `?sort=${sort}`;
        }

        if (limit) {
            if (query.includes("?")) {
                query += `&limit=${limit}`;
            } else {
                query += `?limit=${limit}`;
            }
        }

        const {data} = await axios.get(query);

        return data;
    } catch(err) {
        return rejectWithValue(err);
    }
});

export const updateAvatar = createAsyncThunk("auth/updateAvatar", async (formData, {rejecteWithValue}) => {
    try {
        const {data} = await axios.patch("/users", formData);

        return data;
    } catch (err) {
        return rejecteWithValue(err);
    }
});

export const unlockNewCat = createAsyncThunk("auth/unlockNewCat", async (dataFrom, {rejectWithValue})=> {
    try {
        const {data} = await axios.patch("/users", dataFrom);

        return data;
    } catch(err) {
        return rejectWithValue(err);
    }
});

export const buyItem = createAsyncThunk("auth/buyItem", async ({id, price, ratingBonus}, {getState, rejectWithValue})=> {
    try {
        const state = getState()["auth"];
        const curCoins = state?.authUser["coins"];
        const sendRating = state.authUser.rating + ratingBonus;
        const sendValue = curCoins - price;

        const {data} = await axios.patch("/users", {
            item: id,
            coins: sendValue,
            rating: sendRating
        });

        return data;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const resetAccount = createAsyncThunk("auth/resetAccount", async (_, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`/users/auth/reset_account`);

        return data;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const fetchGetUserItems = createAsyncThunk("auth/fetchGetUserItems", async (_, {rejectedWithValue}) => {
    try {
        const {data} = await axios.get('/users/items');

        return data;
    } catch(err) {
        return rejectedWithValue(err);
    }
});

export const fetchGetAchievements = createAsyncThunk("auth/fetchGetAcievements", async (user, {rejectWithValue}) => {
    try {
        const {data} = await axios.get("/users/achievements");
        return data;
    } catch (err) {
        return rejectWithValue(err);
    }
})

export const fetchGetUnlockCats = createAsyncThunk("auth/fetchGetUnlockCats", async (_, {rejectWithValue}) => {
    try {
        const {data} = await axios.get("/users/unlock_cats");
        return data;
    } catch (err) {
        return rejectWithValue(err);
    }
})

export const fetchChangeCoins = createAsyncThunk("auth/fetchChangeCoins", async (dataFrom, {rejectWithValue, getState})=> {
    try {
        if (!dataFrom) return;
        let sendValue;
        const {value, method} = dataFrom;
        const state = getState()["auth"];
        const curCoins = state?.authUser["coins"];

        if (method === "+") {
            sendValue = curCoins + value;
        } else if (method === "-") {
            sendValue = curCoins - value;
        } else {
            console.error("Неизвестный метод для действий над coins")
        }

        const {data} = await axios.patch(`/users`, {
            coins: sendValue
        });

        return data;
    } catch (err) {
        return rejectWithValue({
            status: err.response.status,
            data: err.response.data
        });
    }
});

export const fetchLogin = createAsyncThunk("auth/fetchLogin", async (loginData, {rejectWithValue}) => {
    try {
        const res = await axios.post("/users/auth/login", loginData);
        return res.data;
    } catch(err) {
        return rejectWithValue({
            status: err.response.status,
            data: err.response.data
        });
    }
});

export const fetchRegister = createAsyncThunk("auth/fetchRegister", async (regData, {rejectWithValue}) => {
    try {
        const {data} = await axios.post("/users/auth/register", {
            name: regData.name,
            email: regData.email,
            password: regData.password,
        });

        return data;
    } catch (err) {
        return rejectWithValue({
            status: err.response.status,
            data: err.response.data
        });
    }
});

export const fetchMe = createAsyncThunk("auth/fetchMe", async (data, {rejectWithValue})=> {
    try {
        const token = window.localStorage.getItem("token");

        if (token) {
            const res = await axios.get("/users/auth/me");

            return res.data;
        }
    } catch(err) {
        return rejectWithValue({
            status: err.response.status,
            data: err.response.data
        });
    }
});

export const fetchCompleteCategory = createAsyncThunk("auth/fetchCompleteCategory", async ({id, bestResult, dataFrom, correctAnswersCount}, {getState, rejectWithValue})=> {
    try {
        const state = getState()["auth"];
        let completeCategories = state.authUser["completeCategories"].slice();
        let ratingAdd;
        const repeatCatIndex = completeCategories.findIndex(cat => cat.cat === id);
        let sendValue;

        if (dataFrom) {
            const {value, method} = dataFrom;
            const curCoins = state?.authUser["coins"];

            if (method === "+") {
                sendValue = curCoins + value;
            } else if (method === "-") {
                sendValue = curCoins - value;
            } else {
                console.error("Неизвестный метод для действий над coins")
            }
        }

        if (repeatCatIndex !== -1) {
            const updatedCat = {
                ...completeCategories[repeatCatIndex],
                bestResult
            };

            completeCategories = [
                ...completeCategories.slice(0, repeatCatIndex),
                updatedCat,
                ...completeCategories.slice(repeatCatIndex + 1),
            ];

        } else {
            completeCategories.push({ cat: id, bestResult });
        }

        if (correctAnswersCount) {
            const addR = correctAnswersCount * 50;
            ratingAdd = state.authUser.rating + addR;
        }

        let sendObj = {
            completeCategories
        }

        if (dataFrom) {
            sendObj["coins"] = sendValue;
        }

        if (ratingAdd) {
            sendObj["rating"] = ratingAdd;
        }

        const {data} = await axios.patch(`/users`, sendObj);

        return {data, dataFrom};
    } catch(err) {
        return rejectWithValue(err)
    }
});

export const fetchNewAchievements = createAsyncThunk("auth/fetchNewAchievements", async (id, {getState, rejectWithValue}) => {
    try {
        const state = getState()["auth"];
        const oldAchievements = state.authUser.achievements;

        if (oldAchievements.find(achiev => achiev === id)) {
            return {
                oldAchievements,
                newAchievements: oldAchievements
            }
        }

        const {data} = await axios.patch(`/users`, {
            achievements: id
        });

        return {
            oldAchievements,
            newAchievements: data.achievements
        };
    } catch (err) {
        return rejectWithValue(err);
    }
})

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetErr: (state) => {
            state.error = null;
        },
        resetNewAchievement: (state) => {
            state.isNewAchievement = false;
        },
        logOut: (state) => {
            state.authUser = null;
            state.achievements = [];
            state.items = [];
            window.localStorage.removeItem("token");
        },
        resetAddCoins: (state) => {
            state.isAddCoins = false;
            state.isDecCoins = false;
        },
        resetUnlockCat: (state) => {
            state.isUnlockCat = false;
        }
    },
    extraReducers: {
        [getAllUsers.pending]: (state) => {
            state.status = STATUS_LOADING;
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.allUsers = action.payload;
            state.status = STATUS_COMPLETE;
        },
        [getAllUsers.rejected]: (state, action) => {
            console.error(action.payload);
            state.status = STATUS_DEFAULT;
        },
        [updateAvatar.fulfilled]: (state, action) => {
            state.authUser = action.payload;
        },
        [updateAvatar.rejected]: (state, action) => {
            console.error(action.payload);
        },
        [unlockNewCat.fulfilled]: (state, action) => {
            state.isUnlockCat = true;
            state.authUser = action.payload;
        },
        [unlockNewCat.rejected]: (state, action) => {
            console.error(action.payload);
        },
        [resetAccount.fulfilled]: (state, action) => {
            state.authUser = action.payload;
            state.unlockCategories = [];
        },
        [resetAccount.rejected]: (state, action) => {
            console.error(action.payload);
        },
        [buyItem.fulfilled]: (state, action) => {
            state.authUser = action.payload;
            state.isDecCoins = true;
        },
        [buyItem.rejected]: (state, action) => {
            console.error(action.payload);
        },
        [fetchGetUserItems.pending]: (state) => {
            state.authUser.status = STATUS_LOADING;
        },
        [fetchGetUserItems.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.authUser.status = STATUS_COMPLETE;
        },
        [fetchGetUserItems.rejected]: (state, action) => {
            console.error(action.payload);
            state.authUser.status = STATUS_DEFAULT;
        },
        [fetchGetAchievements.fulfilled]: (state, action) => {
            state.achievements = action.payload;
        },
        [fetchGetAchievements.rejected]: (state, action) => {
            console.error(action.payload)
        },
        [fetchGetUnlockCats.fulfilled]: (state, action) => {
            state.unlockCategories = action.payload;
        },
        [fetchGetUnlockCats.rejected]: (state, action) => {
            console.error(action.payload)
        },
        [fetchNewAchievements.fulfilled]: (state, action) => {
            const {oldAchievements, newAchievements} = action.payload;

            if (oldAchievements.length !== newAchievements.length) {
              state.isNewAchievement = true;
              state.authUser.achievements = newAchievements;
            }
        },
        [fetchNewAchievements.rejected]: (state, action) => {
            console.error(action.payload)
        },
        [fetchRegister.pending]: (state) => {
            state.status = STATUS_LOADING;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = STATUS_COMPLETE;
            state.authUser = action.payload["createUser"];
            window.localStorage.setItem("token", action.payload["token"]);
        },
        [fetchRegister.rejected]: (state, action) => {
            state.error = action.payload.data.errors[0]["msg"];
            state.status = STATUS_DEFAULT;
        },
        [fetchLogin.pending]: (state) => {
            state.status = STATUS_LOADING;
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.authUser = action.payload.user;
            state.status = STATUS_COMPLETE;
            state.error = null;

            if (action.payload.token) {
                window.localStorage.setItem("token", action.payload.token)
            }
        },
        [fetchLogin.rejected]: (state, action) => {
            state.status = STATUS_DEFAULT;
            state.error = action.payload.data.message;
        },
        [fetchMe.fulfilled]: (state, action) => {
            state.authUser = action.payload;
        },
        [fetchChangeCoins.pending]: (state) => {
            state.isAddCoins = false;
        },
        [fetchChangeCoins.fulfilled]: (state, action) => {
            state.isAddCoins = true;
            state.authUser = action.payload;
        },
        [fetchChangeCoins.rejected]: (state, action) => {
            state.isAddCoins = false;
            console.error(action.payload);
        },
        [fetchCompleteCategory.fulfilled]: (state, action) => {
            if (action.payload.dataFrom) {
                state.isAddCoins = true;
            }

            state.authUser = action.payload.data;
        },
        [fetchCompleteCategory.rejected]: (state, action) => {
            console.error(action.payload.data);
            state.isAddCoins = false;
        }
    }
});

export default userSlice.reducer;
export const {resetErr, logOut, resetAddCoins, resetNewAchievement, resetUnlockCat} = userSlice.actions;
