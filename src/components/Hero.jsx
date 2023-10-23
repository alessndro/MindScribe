import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import {Link} from 'react-router-dom'
import Spline from '@splinetool/react-spline';
import { useAuth } from './AuthContext'

export default function Hero() {
    const {currentUser} = useAuth()
    return (
        <header className=" mx-auto flex my-10 px-6 container flex-col md:flex-row md:py-10">
            <div className=' flex items-center py-10 flex-col md:w-1/2 md:items-start'>
                <h1 className=" max-w-lg text-6xl mb-1 font-extrabold text-center md:text-7xl md:text-left">
                    Learn
                    
                    <TypeAnimation
                                    sequence={[
                                    " Smarter",
                                    2000,
                                    " Faster",
                                    2000,
                                    " Better",
                                    2000,
                                    ]}
                                    speed={300}
                                    repeat={Infinity}
                                    
                                /> 
                                </h1>
                    <span className="orange_gradient">
                        <h1 className='max-w-xl text-6xl mb-5 font-extrabold text-center md:text-7xl md:text-left'>with AI's power</h1>
                    </span>

                <p className="max-w-md mb-8 text-xl text-center md:text-xl md:text-left">
                    Effortless Learning Starts Now!
                    Unlock Your Learning Potential with MindScribe: Summarize, Practice, Excel!
                </p>
                <Link to={currentUser ? '/dashboard' : '/signin'}
                            className='purple-btn hidden md:block  bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                            type="button"

                        >
                            Get Started
                        </Link>
            </div>
            <div className='flex flex-col justify-center items-center md:w-1/2'>
            <div>
                <Spline scene="https://prod.spline.design/pUO2g-e1jNxKkMqy/scene.splinecode" />
            </div>
            
            </div>
        </header>
    )
}