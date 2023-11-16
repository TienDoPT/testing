import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../screen/Login'
import Home from '../screen/Home'


export default function Navigation() {
    const { isLogin } = useSelector(state => state.auth)

    return (
        isLogin ? <Home /> : <Login />
    )
}
