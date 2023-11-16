import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    userInfo: {},
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLogin = true
            state.userInfo = action.payload
        },
        logout: (state) => {
            state.isLogin = initialState.isLogin
            state.userInfo = initialState.userInfo
        }
    },
})

export const authAction = authSlice.actions

export default authSlice.reducer