import React from 'react'
import { Link, useNavigate, NavLink } from "react-router-dom"
import { useAuth } from './AuthContext'
import burgerMenu from '../assets/burger-menu.svg'
import xSymbol from '../assets/x-symbol.svg'

export default function Navbar() {
    const navigate = useNavigate()

    const {currentUser, signout} = useAuth()
    const [isNavOpen, setIsNavOpen] = React.useState(false)
    const [error, setError] = React.useState()

    async function handleLogOut() {
        try {
            console.log('sign out')
          await signout();
          // Sign-out successful, now navigate to the "/login" route
          navigate('/', { state: { message: 'User Successfully logged out' } });
        } catch (error) {
          // Handle sign-out error
          console.log(error)
          setError('Sign-out error:', error);
        }
      };

      const activeStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline',
    }

    function toggleMenu() {
        console.log('menu toggled')
        setIsNavOpen(prevNav => !prevNav)
    }

    return (
            <nav className=" container relative w-screen mx-auto p-6" >
                
                <div className='flex justify-between'>
                    
                    <div className='flex items-center '>
                        <Link to='/'><h1 className='font-extrabold text-2xl'>MindScribe</h1></Link>
                    </div>

                    
                    <div className='flex items-center md:flex  space-x-6'>
                        <NavLink
                            className='hidden md:block'
                            style={({isActive}) => isActive ? activeStyle : null}
                            to="dashboard"
                        >
                            Dashboard
                        </NavLink>
                        {!currentUser && <NavLink 
                            className='hidden md:block'
                            style={({isActive}) => isActive ? activeStyle : null}
                            to="signup">Register
                        </NavLink>}
                            { currentUser ? <button className='hidden md:block' onClick={handleLogOut}>Log out</button> : <NavLink className='hidden md:block'
                            style={({isActive}) => isActive ? activeStyle : null}
                            to="signin">Log in
                        </NavLink>}
                    </div>
                    <Link to={currentUser ? '/dashboard' : '/signin'}
                            className='purple-btn hidden md:block bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                            type="button"

                        >
                            Get Started
                        </Link>

                    {/* Hamburger icon */}
                    {isNavOpen === false ? <button onClick={toggleMenu} className='block hamburger md:hidden'><img className=" w-7 h-7" src={burgerMenu} alt="burger menu" /></button>: 
                     <button onClick={toggleMenu} className='hamburger md:hidden'><img className=" w-7 h-7"src={xSymbol} alt="burger menu" /></button> }
                    {/* <button onClick={toggleMenu} className='block hamburger md:hidden'><img className="border border-black w-10 h-10"src={burgerMenu} alt="burger menu" /></button> */}
                </div>

                        
                {/* Mobile Menu */}
                { isNavOpen && 
                <div className='fixed inset-x-0 flex flex-col bg-white  md:hidden items-center mx-auto py-10'> 
                    <div className='flex flex-col'>
                        <NavLink
                            className='text-center'
                            style={({isActive}) => isActive ? activeStyle : null}
                            to="/"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            className='my-5'
                            style={({isActive}) => isActive ? activeStyle : null}
                            to="dashboard"
                        >
                            Dashboard
                        </NavLink>
                        {!currentUser && <NavLink 
                            className='text-center mb-5'
                            style={({isActive}) => isActive ? activeStyle : null}
                            to="signup">Register
                        </NavLink>}
                            { currentUser ? <button className='text-center' onClick={handleLogOut}>Log out</button> : <NavLink className='hidden md:block'
                            style={({isActive}) => isActive ? activeStyle : null}
                            to="signin">Log in
                        </NavLink>}
                    </div>
                    <Link to={currentUser ? '/dashboard' : '/signin'}
                            className='purple-btn hidden md:block bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                            type="button"
                        >
                            Get Started
                        </Link>

                </div>

                }      
                
            </nav>
    )
}