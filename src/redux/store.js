import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/authSlice'

const rootReducer = combineReducers({
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export const setupStore = preloadedState => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}
