import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import {useAuth} from './AuthContext'

export default function AuthRequired() {
    // Retrieve current user from Context,
    const {currentUser} = useAuth()
    
    // If logged in, show content, otherwise login first
    if (currentUser) {
            return <Outlet />
    }
    else {
            return <Navigate 
            to="/signin"
            state={{message: "Log in first, please"}} />
    }
      
}