// import { process } from '../env'
import OpenAI from 'openai'
import process from 'process';
// import dotenv from 'dotenv'
// import 'dotenv/config'

// dotenv.config()

// const TEXT_SUM_KEY = import.meta.env.TEXT_SUM_KEY
// const REACT_APP_OPENAI_API_KEY = import.meta.env.REACT_APP_OPENAI_API_KEY;
// const REACT_APP_TEXT_SUM_KEY = import.meta.env.REACT_APP_TEXT_SUM_KEY;

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY
// const TEXT_SUM_KEY = process.env.REACT_APP_TEXT_SUM_KEY

// const openai = new OpenAI({
//     apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true
// })

// COMMENTED OUT TEMPORARLY
// export default async function fetchTransscript(youtubeId){
//         const url = `https://youtube-transcriptor.p.rapidapi.com/transcript?video_id=${youtubeId}&lang=en`;
//         const options = {
//                 method: 'GET',
//                 headers: {
//                     'X-RapidAPI-Key': TEXT_SUM_KEY,
//                     'X-RapidAPI-Host': 'youtube-transcriptor.p.rapidapi.com'
//                 }
//         }
//         const response = await fetch(url, options);
//         if (!response.ok) {
//                 throw {
//                         message:"Failed to fetch transcript",
//                         statusText: response.statusText,
//                         status: response.statusText
//                 }
//         }
//         const result = await response.json();
//         const transscript = result[0].transcription.map((sentence) => {
//             return sentence.subtitle
//         })
           
//         return transscript
// }

// TEST severless function 1
export default async function fetchTransscript(youtubeId){

    const url = 'https://lighthearted-tulumba-ad8574.netlify.app/.netlify/functions/fetchYoutubeTransscript'
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'text/plain',
        },
        body: youtubeId
    })

    const result = await response.json();
    return result.value.join(" ")
}
//////////////////////////////////////////////////////////////

// TEST severless function 2
export async function fetchYoutubeSummary(textString){

    const url = 'https://lighthearted-tulumba-ad8574.netlify.app/.netlify/functions/fetchYoutubeIncompleteSummary'
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'text/plain',
        },
        body: textString
    })

    const result = await response.json();
    return result.value
}

export async function fetchArticleSummary(articleUrl){
    const url = 'https://lighthearted-tulumba-ad8574.netlify.app/.netlify/functions/fetchArticleIncompleteSummary'
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'text/plain',
        },
        body: articleUrl
    })

    const result = await response.json();
    return result.value
}

export async function fetchCompleteSummary(incompleteSummary) {

    const url = 'https://lighthearted-tulumba-ad8574.netlify.app/.netlify/functions/OpenAiCompleteSummary'
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'text/plain',
        },
        body: incompleteSummary
    })

    const result = await response.json();
    return result.value   
}

export async function fetchPracticeQuestions(completeSummary) {

    const url = 'https://lighthearted-tulumba-ad8574.netlify.app/.netlify/functions/OpenAiCreateQuestions'
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'text/plain',
        },
        body: completeSummary
    })

    const result = await response.json();
    return result.value   
}

export async function fetchTutorResponse(shortSummary, prevQuestion) {

    const url = 'https://lighthearted-tulumba-ad8574.netlify.app/.netlify/functions/OpenAiTutor'
    
    const requestData = `${shortSummary} ! ${prevQuestion}`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'text/plain',
        },
        body: requestData
    })

    const result = await response.json();
    return result.value   
}
