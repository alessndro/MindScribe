// import { process } from '../env'
import OpenAI from 'openai'
import process from 'process';
// import dotenv from 'dotenv'
// import 'dotenv/config'

// dotenv.config()

// const TEXT_SUM_KEY = import.meta.env.TEXT_SUM_KEY
// const REACT_APP_OPENAI_API_KEY = import.meta.env.REACT_APP_OPENAI_API_KEY;
// const REACT_APP_TEXT_SUM_KEY = import.meta.env.REACT_APP_TEXT_SUM_KEY;

// const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY
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

// TEST severless function
export default async function fetchTransscript(youtubeId){

    console.log('Inside Fetch Transscript - API.js')
    const url = 'https://lighthearted-tulumba-ad8574.netlify.app/.netlify/functions/fetchYoutubeTransscript'
    
    console.log('Fetching to severless function')
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'text/plain',
        },
        body: youtubeId
    })

    console.log('RESULT INSIDE API.JS fetching the severless function, returned to dashboard')
    const result = await response.json();
    console.log(result)
    return result.value.join(" ")
}
//////////////////////////////////////////////////////////////
// export async function fetchYoutubeSummary(textString)
// {
//     const url = 'https://textanalysis-text-summarization.p.rapidapi.com/text-summarizer-text';
//     const options = {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded',
//             'X-RapidAPI-Key': TEXT_SUM_KEY,
//             'X-RapidAPI-Host': 'textanalysis-text-summarization.p.rapidapi.com'
//         },
//         body: new URLSearchParams({
//             text: textString,
//             sentnum: '8'
//         })
//     };
        
//     const response = await fetch(url, options);
//     if (!response.ok)
//     {
//         throw {
//         message:"Failed to fetch summary",
//         statusText: response.statusText,
//         status: response.statusText
//         }
//     }
//     const result = await response.json();
//     return result.sentences.join('.')
// }

// export async function fetchArticleSummary(articleUrl)
// {
//     const url = 'https://textanalysis-text-summarization.p.rapidapi.com/text-summarizer-url';
//     const options = {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded',
//             'X-RapidAPI-Key': TEXT_SUM_KEY,
//             'X-RapidAPI-Host': 'textanalysis-text-summarization.p.rapidapi.com'
//         },
//         body: new URLSearchParams({
//             url: articleUrl,
//             sentnum: '8'
//         })
//     }
        
//     const response = await fetch(url, options);
//     if (!response.ok)
//     {
//         throw {
//         message:"Failed to fetch summary",
//         response: response,
//         statusText: response.statusText,
//         status: response.statusText
//         }
//     }
//     const result = await response.json();
//     return result.sentences.join('.')
// }

// export async function fetchCompleteSummary(incompleteSummary) {
//     const response = await openai.completions.create({
//     model:'text-davinci-003',
//     prompt: `Please return a summary in a JSON format without a name. In this JSON object create a summary of the text provided by generating a title for the summary with key title, provide a short summary with key shortSummary, outline the key points with key keyPoints, and list the three most important topics based on the given summary with key completeSummary. Explain each of these elements in a simple and clear manner, as if you were teaching a beginner. Return the summary items in a JSON object with key and values. example of response: 
//     {"title": "This is a test title", "shortSummary": "Lorum ipsum servues magnus. Latinus magnus ceasar octivatus. Magnus madidi", "keyPoints": "["keypoint1: is lala plopa", "keypoint2: ik ga eventjes lekker dansen", "keypoints3: ik ben een rapper"], "importantTopics": "["important topic 1", "important topic 2"]}. use the following text:${incompleteSummary}. JSON object:`,
//     max_tokens: 500,
//     })

//     const trimmedObject = response.choices[0].text.trim()
                        
//     const regex = /\n/g;
//     const removedNewLinesObject = trimmedObject.replace(regex, '');

//     const object = JSON.parse(removedNewLinesObject)
//     return object
                       
// }

// export async function fetchPracticeQuestions(completeSummary) {
//     const response = await openai.completions.create({
//     model:'text-davinci-003',
//     prompt: `Please return a list of 5 objects with multiple choice practice questions in a JSON format without a name based on a summary. Only base the questions on the topic in the summary. In this JSON object create a list with inside for each question a seperate object with properties: question, 1 correct answer and 3 wrong answers. example of response: [{"question": "question1", "correctAnswer": "", "wrongAnswers": ["", "", ""]}]. use the following summary for the questions:${completeSummary}. JSON object:`,
//     max_tokens: 600,
//     })

//     const trimmedObject = response.choices[0].text.trim()
//     const regex = /\n/g;
//     const removedNewLinesObject = trimmedObject.replace(regex, '');
//     const object = JSON.parse(removedNewLinesObject)

//     const newObjectArray = object.map((questionObject) => {
//          // save old value in list
//          let answers = questionObject.wrongAnswers
//          let answerToAdd = questionObject.correctAnswer 
//          const randomIndex = Math.floor(Math.random() * 3);
//          answers.splice(randomIndex, 0 , answerToAdd)
  
//          // const answers = questionObject.wrongAnswers.splice(questionObject.correctAnswer, 0, randomNumber)
//          const answersObjectArray = answers.map((answer) => {
//              return {
//                  answer: answer,
//                  isSelected: false
//              }
//          })
//          return {
//              question: questionObject.question,
//              answers: answersObjectArray,
//              correct: questionObject.correctAnswer
//          }
//     })
//     return newObjectArray               
// }


    
// export async function fetchTutorResponse(completeSummary, question) {
//     const response = await openai.completions.create({
//     model:'text-davinci-003',
//     prompt: `You are a highly knowledgeable assistant that is always happy to help. You gave the student the following summary:${completeSummary}. Now the student asks you ${question}. Respond the question in a friendly and supportive but also concise manner`,
//     max_tokens: 500,
//     })

//     const data = response.choices[0].text.trim()
//     const trimmedText = data.trim().replace(/^\. */, '');
//     return trimmedText                 
// }


