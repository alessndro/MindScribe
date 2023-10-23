import React from 'react'
import { useOutletContext } from "react-router-dom";

export default function Summary() {
    const {articleObject} = useOutletContext()
    return (
        <>
       {articleObject && <div className='summary_box mb-10' >
                                <div className='font-bold mb-2 text-xl'>
                                    <h2>{articleObject.completeSummary.title}</h2>
                                </div>
                                <div className='mb-2'>
                                    <p>{articleObject.completeSummary.shortSummary}</p>
                                </div>
                                <div className='mb-2'>
                                    <ul>
                                    {articleObject.completeSummary.keyPoints && articleObject.completeSummary.keyPoints.map((keyPoint, index) => {
                                        return <li key={index}>- {keyPoint}</li>
                                    })} 
                                    </ul>
                                </div>
                                <div className='mb-2'>
                                    <ul>                                    
                                        {articleObject.completeSummary.importantTopics && articleObject.completeSummary.importantTopics.map((topic, index) => {
                                        return <li key={index}>- {topic}</li>
                                    })}
                                    </ul>
                                </div>
                        </div> }
        </>
    )
}