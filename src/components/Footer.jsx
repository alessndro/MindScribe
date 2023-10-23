import React from 'react'
import {NavLink} from 'react-router-dom'
import { useAuth } from './AuthContext'


export default function Footer() {

    const {currentUser, handleLogOut} = useAuth()
    
    return (
        <footer className="rounded-lg mt-15 container mx-auto p-6 ">
            <div className="md:py-8">
                <div className="flex justify-between items-center">                
                        <span className="self-center text-md whitespace-nowrap">MindScribe</span>
                        <div className=' flex gap-2'>
                        <NavLink
                            className=''
                            to="dashboard"
                        >
                            Dashboard
                        </NavLink>
                        {!currentUser && <NavLink 
                            className=''
                            to="signup">Register
                        </NavLink>}
                            { currentUser ? <button className='' onClick={handleLogOut}>Log out</button> : <NavLink className=''
                            to="signin">Log in
                        </NavLink>}
                        </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-black-100 sm:text-center font-normal ">© 2023 <a href="https://flowbite.com/" className="hover:underline">MindScribe™</a>. All Rights Reserved.</span>
            </div>
        </footer>
    )}