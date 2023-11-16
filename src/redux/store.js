import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/authSlice'
export const store = configureStore({
    reducer: { auth: authReducer },
})

const rootReducer = combineReducers({
    auth: authReducer
})

export const setupStore = preloadedState => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}
