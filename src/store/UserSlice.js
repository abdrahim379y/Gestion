import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isAuthenticated: false
    },
    reducers: {
        isLoggedIn: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
})

export const { isLoggedIn, logout } = userSlice.actions;
export default userSlice.reducer