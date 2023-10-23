import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Spline from '@splinetool/react-spline';
import {Link} from 'react-router-dom'


export default function Error() {
  return (
    <div className='flex items-center flex-col'>
        <Navbar />
        <div
        className='container mx-auto p-6 w-full h-96 flex justify-center items-center'
    >
        <Spline scene="https://prod.spline.design/1c9ulSKfjyDPXZIi/scene.splinecode" />
    </div>
        <Link className='purple-btn md:block  bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' to="/">Return to home page</Link>
        <Footer />
    </div>

    
  )
}
