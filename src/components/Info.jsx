import React from 'react'
import loaderLogo from '../assets/loader.svg'
import { useAuth } from './AuthContext'
import {Link} from 'react-router-dom'


export default function Info(){
    const [currentYoutubeObject, setCurrentYoutubeObject] = React.useState({
        url: '',
        id: '',
        completeSummary: {},
        questions: [],
    })
    const [loading, setLoading] = React.useState()
    const {currentUser} = useAuth()
    
    return (
        <main className=''>
        <section className="container relative w-screen mx-auto py-12 px-6">
            <div className='flex flex-col md:flex-row'>

                <div className='py-10 items-center flex flex-col justify-center text-center font-bold space-y-5 md:w-1/2 md:items-start md:py-0 md:justify-start md:text-left'>
                    <h2 className='text-2xl w-max-small md:text-3xl'>Why Would you use MindScribe?</h2>
                    <p className='max-w-xs font-light md:text-left'>MindScribe allows you to quickly generate article or YouTube video summaries using AI, saving you valuable time. After summarizing content, Mind Scribe offers the opportunity to practice and engage with the material.</p> 
                    
                </div>

                
                <div className='flex flex-col font-bold space-y-10 md:w-1/2 md:justify-start md:text-left'>
                    
                    <div className='flex flex-col md:flex-row md:items-start'>
                        <div className='flex bg-purple-200 mb-2 items-center rounded-l-full md:bg-transparent'>
                            <div className='rounded-full mr-3 bg-purple-600 px-4 py-2 text-white'>01</div>
                            <h3 className='md:hidden'>Efficiency and Time Savings</h3>
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='hidden md:block'>Efficiency and Time Savings</h3>
                            <p className='font-normal md:max-w-xs ' >No need to go through long content when you can get a concise summary in seconds. This time efficiency is crucial in today's fast-paced world.</p>
                        </div>
                        
                    </div>
                    
                    <div className='flex flex-col md:flex-row md:items-start'>
                        <div className='flex bg-purple-200 mb-2 items-center rounded-l-full md:bg-transparent'>
                            <div className='rounded-full mr-3 bg-purple-600 px-4 py-2 text-white'>02</div>
                            <h3 className='md:hidden'>Effective Learning</h3>
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='hidden md:block'>Effective Learning</h3>
                            <p className='font-normal md:max-w-xs ' >MindScribe's practice, such as asking questions and discussing topics with AI, reinforces your understanding and retention of the material. It's not just about passively consuming content; it's about active learning.</p>
                        </div>
                        
                    </div>

                    <div className='flex flex-col md:flex-row md:items-start'>
                        <div className='flex bg-purple-200 mb-2 items-center rounded-l-full md:bg-transparent'>
                            <div className='rounded-full mr-3 bg-purple-500 px-4 py-2 text-white'>03</div>
                            <h3 className='md:hidden'>Personalized Learning Experience</h3>
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='hidden md:block'>Personalized Learning Experience</h3>
                            <p className='font-normal md:max-w-xs ' >MindScribe harnesses the power of AI to tailor the learning experience to your specific needs. By tracking your progress and analyzing your interactions, it can provide recommendations and insights to help you learn better and faster.</p>
                        </div>
                        
                    </div>
                    
                </div>

           
            </div> 
        </section>

        <section className="mt-15 container relative w-screen mx-auto py-12 px-6">
            <div className='text-center flex flex-col items-center'>
                <h2 className='font-bold text-2xl max-w-2xl md:text-3xl'>Ready to supercharge your learning and unlock your full potential?</h2>
                    <div className='my-5'>
                        <p className='max-w-lg font-light text-center md:text-left'>Start now and take control of your learning journey, because the sooner you begin, the faster you'll see results. Embrace the future of learning—use MindScribe today!</p> 
                    </div>
                    <Link to={currentUser ? '/dashboard' : '/signin'}
                            className='purple-btn hidden md:block bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                            type="button"

                        >
                            Try it now for Free
                        </Link>
            </div>
        </section>

      

        { loading ? <img src={loaderLogo}/> : null}
        {currentYoutubeObject.summary && 
        <section className="mt-10 container relative w-screen mx-auto p-6">
            <div className='flex flex-col items-center'>
                <div className='summary_box my-10' id={currentYoutubeObject.id}>
                        <div className='font-bold mb-2 text-xl'>
                            <p>{currentYoutubeObject.summary.title}</p>
                        </div>
                        <div className='mb-2'>
                            <p>{currentYoutubeObject.summary.shortSummary}</p>
                        </div>
                        <div className='mb-2'>
                            {currentYoutubeObject.summary.outline.map((outline, index) => {
                                return <p key={index}>{outline}</p>
                            })}
                        </div>
                        <div className='mb-2'>
                            {currentYoutubeObject.summary.importantTopics.map((topic, index) => {
                                return <p key={index}>{topic}</p>
                            })}
                        </div>
                    </div> 
                    <p>Create an account and get access to our Quizzer and Tutor function!</p>
            </div>
        </section>}
       
    
        </main>
    )
}