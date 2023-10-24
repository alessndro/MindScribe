import React from 'react'
import Spline from '@splinetool/react-spline';
// import {fetchTutorResponse} from '../functions/api'
import { useOutletContext } from "react-router-dom";

export default function Questions() {
    const { articleObject } = useOutletContext()
    const [currentQuestion, setCurrentQuestion] = React.useState('')
    const [prevQuestion, setPrevQuestion] = React.useState('')
    const [currentAnswer, setCurrentAnswer] = React.useState('')

    const shortSumary = articleObject.completeSummary.shortSummary
    function handleChange(event) {
        console.log(handleChange)
        setCurrentQuestion(event.target.value)
        console.log(currentQuestion)
    }
    function handleSubmit(event) {
        event.preventDefault()
        console.log('handle Submit')
        fetchTutorResponseData(shortSumary, currentQuestion)
        setPrevQuestion(currentQuestion)
        setCurrentQuestion('')

    }

    async function fetchTutorResponseData(shortSumary, prevQuestion){
        const response = await fetchTutorResponse(shortSumary, prevQuestion)
        console.log(response)
        setCurrentAnswer(response)      
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='h-96'>
                <Spline scene="https://prod.spline.design/Vt2VwgNVrPr7YB8q/scene.splinecode" />
            </div>

            {<div class="widget-wrap">
                 
                 
                {currentAnswer && <div class="speech top">


                    <p className='text-white'>{currentAnswer}</p>
                </div>}
                {prevQuestion && <div class="speech bottom">
                    <p className='text-white'>{prevQuestion}</p>
                </div>}
            </div>}
             <form onSubmit={handleSubmit} className='relative mt-10 flex justify-center items-center max-w-sm' >
                            <input
                                    className='url_input peer'
                                    type="text"
                                    value={currentQuestion}
                                    onChange={handleChange}                  
                                    placeholder="Ask me anything!"
                                    required>
                            </input>
                            <button 
                                    type="submit"
                                    className='submit_btn
                                    peer-focus:border-gray-700
                                    peer-focus:text-gray-700'>⏎
                            </button>
                        </form>
        </div>
    )
}