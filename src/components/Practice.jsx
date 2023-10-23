import React from 'react'
import { useOutletContext } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar'



export default function Practice() {
    const {articleObject, setObject} = useOutletContext()
    const [questionAndAnswer, setQuestionAndAnswer] = React.useState([])
    const [correctAmount, setCorrectAmount] = React.useState(0)
    const [showcaseAmount, setShowcaseAmount] = React.useState(0)
    const [error, setError] = React.useState('')
    
    function handleChooseAnswer(event, question) {
        setObject((prevObject) => {
            return {
                ...prevObject,
                practiceQuestions: prevObject.practiceQuestions.map((questionObject) => {
                    if (questionObject.question === question) {
                        return {
                            ...questionObject,
                            answers: questionObject.answers.map((answerObject) => {
                                if (answerObject.answer === event.target.innerText) {
                                    return {
                                        ...answerObject,
                                        isSelected: true
                                    };
                                }
                                else {
                                    return {
                                        ...answerObject,
                                        isSelected: false
                                    }
                                }
                            })
                        };
                    }
                    return questionObject;
                })
            };
        });
    }

    function handleResetQuestions() {
        // Reset showcaseAmount to 0
        setShowcaseAmount(0);
    
        setObject((prevObject) => {
            return {
                ...prevObject,
                isRan: false,
                completeSummary: {
                    ...prevObject.completeSummary,
                    shortSummary: prevObject.completeSummary.shortSummary + ' ',
                }
            };
        });
    
        setCorrectAmount(0);
        setError('');
        console.log('uit handle rest');
    }
    

    console.log(articleObject
        )
    function handleSubmitPractice(){
        let listCorrectAnswers = []
        let listSubmittedAnswers = []
        let correctAnswers = 0

        articleObject.practiceQuestions.forEach((questionObject) => {
            questionObject.answers.forEach((answer) => {
                if (answer.isSelected)
                {
                    listSubmittedAnswers.push(answer.answer)
                }
            })
            listCorrectAnswers.push(questionObject.correct)
        })
        
        if (listCorrectAnswers.length !== listSubmittedAnswers.length)
        {
            console.log(listCorrectAnswers.length)
            console.log(listSubmittedAnswers.length)
            console.log('not the same')
            setError('Select an answer for all questions, please')
        }

        for (let i = 0; i < articleObject.practiceQuestions.length; i++)
        {
            if (listCorrectAnswers.includes(listSubmittedAnswers[i]))
            {
                correctAnswers = correctAnswers + 1
            }
        }
        console.log(correctAnswers)

        setCorrectAmount((correctAnswers / listSubmittedAnswers.length) * 100)
    }

    function showScore() {
        setShowcaseAmount(correctAmount)
    }

    
 
    return (
    <>
          <div className=' h-96 flex flex-col items-center overflow-y-scroll'>
            {!correctAmount > 0 && <h3 className='text-purple-900'>Scroll down for more questions</h3>}
            {!correctAmount > 0 && <h4 className='text-purple-900'>↓</h4>}
            { !correctAmount && articleObject.practiceQuestions.map((question, index) => (
                <div className='my-5 w-13 mx-5 text-center' key={index}>
                  <h3>Question: {question.question}</h3>
                    <div className='flex flex-col'>
                        <ol>
                    {question.answers.map((answer, answerIndex) => (
                        // 'px-3 mb-5 py-5 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer min-w-full'
                        <div style={answer.isSelected ? { fontWeight: 'bold' } : {}} onClick={(event) => handleChooseAnswer(event, question.question)}className='border text-center py-2 px-4 my-3 mx-10 bg-white border-gray-200 rounded-lg cursor-pointer max-w-xl'  key={answerIndex}><li><p>{answer.answer}</p></li></div>
                    ))}
                    </ol>
                    </div>
                </div>
              ))}
              
                    
                {correctAmount > 0 && <CircularProgressbar
                className='my-10'
                value={showcaseAmount} // Set the value to the final value you want to reach
                text={`${showcaseAmount}%`}
                styles={{
                    root: {},
                    path: {
                    stroke: `#581c87`, // Use a solid color for the path
                    strokeLinecap: 'butt',
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    },
                    trail: {
                    stroke: '#a855f7',
                    },
                    text: {
                    fill: 'black',
                    fontSize: '16px',
                    },
                    background: {
                    fill: 'white',
                    },
                }}
                />}
             </div>
                {error && <p className='my-4'>{error}</p>}
                {!correctAmount && <button className='purple-btn bg-purple-800 text-white font-bold py-2 px-4 rounded-full my-4' onClick={handleSubmitPractice}>Submit your Answers</button>}
                {correctAmount > 0 && !showcaseAmount ? <button className='purple-btn bg-purple-800 text-white font-bold py-2 px-4 rounded-full my-4'  onClick={showScore}>Show your Score</button> : ''}
                {showcaseAmount > 0 && <button className='purple-btn bg-purple-800 text-white font-bold py-2 px-4 rounded-full my-4'  onClick={handleResetQuestions}>Create new questions</button>}
         </>
    )
}
