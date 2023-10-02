import React from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { process } from '../env'
// import { OpenAIApi } from 'openai'
// import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai'
import loaderLogo from '../assets/loader.svg'


export default function Demo(){
    const [youtubeUrl, setYoutubeUrl] = React.useState({video: ""})
    const [youtubeId, setYoutubeId] = React.useState()
    const [text, setText] = React.useState('')
    const [summary, setSummary] = React.useState()
    const [completeSummary, setCompleteSummary] = React.useState()
    const [loading, setLoading] = React.useState()
    const [error, setError] = React.useState()
    
    // const configuration = new Configuration({
    //     apiKey: process.env.OPENAI_API_KEY
    //   })
      
    // const openai = new OpenAI(configuration)

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true
    })

    function handleChange(event) {
        setYoutubeUrl(
            {[event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        // Handle submit of youtube video
        event.preventDefault()

        // Helper function retrieving ID from url
        function getId(url) {
            let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
            return regex.exec(url)[3];
          }
        
        // Retrieve url from state & ID after
        let youtubeVideo = youtubeUrl.video
        setYoutubeId(getId(youtubeVideo))
        console.log(youtubeId)

        // TEST ene useEffect om tekst van youtube te krijgen weggehaald over limit heen
        // Nu dus tekst testen naar tweede API
        // setText(`he New York state P-12 Common Core Learning Standards for English Language Arts (ELA) and Literacy (“the Standards”) state that students graduating from high school should be able to “read and comprehend complex literary and informational texts independently and proficiently.” This challenging goal for learning is not unique to students’ high school years. Rather, it is embedded in the learning standards throughout the K-12 grades so that students develop this ability over time, a skill that ultimately they will need throughout their lives. In addition, the ELA standards require that students engage with complex texts across a variety of disciplines. Comprehending text in different disciplines involves understanding the purposes, concepts, structural organization and language use unique to those disciplines, a consideration about learning in most disciplines that has typically not been explicitly addressed.

        // Because the idea of complex text permeates all the disciplines and levels of schooling, concern about its implications for teaching goes far beyond the high school English teacher. The new focus on complex texts across the disciplines generalizes these concerns (about not only how to select appropriate text materials but also how to support students in reading and comprehending complex texts) to all teachers. These concerns become particularly heightened when we consider English Language Learners (ELLs) and Multilingual Learners (MLs) in our classrooms, the students who are simultaneously asked to read and comprehend complex texts in a language they are still learning.`)

    }

    React.useEffect(() => {

        if (youtubeId)
        {
            setLoading(true)
            // Fill information for Fetch
            const url = `https://youtube-transcriptor.p.rapidapi.com/transcript?video_id=${youtubeId}&lang=en`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '2881cff088msh5bf7a5023fcfc74p1d9ad6jsn133ef95d6cdd',
                    'X-RapidAPI-Host': 'youtube-transcriptor.p.rapidapi.com'
                }
            };

            // Actual fetch request
            async function fetchData() 
            {
                try {
                    const response = await fetch(url, options);
                    if (!response.ok)
                    {
                        throw {
                            message:"Failed to fetch transcript",
                            statusText: response.statusText,
                            status: response.statusText
                        }
                    }
                    const result = await response.json();
                    console.log(result[0].transcription);
                    const transscript = result[0].transcription.map((sentence) => {
                        return sentence.subtitle
                    })
                    console.log('TEXT IS BEING SET')
                    console.log(transscript)
                    setText(transscript)
                    console.log(text)

                } catch (error) {
                    console.error(error);
                }
            }
            fetchData()
        }
    },[youtubeId])
        

    React.useEffect(() => {

        if (text) {
            
            const textString = text.join(' ')

            async function fetchSummary() {
                const url = 'https://textanalysis-text-summarization.p.rapidapi.com/text-summarizer-text';
                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'X-RapidAPI-Key': '2881cff088msh5bf7a5023fcfc74p1d9ad6jsn133ef95d6cdd',
                        'X-RapidAPI-Host': 'textanalysis-text-summarization.p.rapidapi.com'
                    },
                    body: new URLSearchParams({
                        text: textString,
                        sentnum: '5'
                    })
                };
                
                try {
                    const response = await fetch(url, options);
                    if (!response.ok)
                    {
                        throw {
                            message:"Failed to fetch summary",
                            statusText: response.statusText,
                            status: response.statusText
                        }
                    }
                    const result = await response.json();
                    console.log(result)
                    setSummary(result.sentences.join('.'))
                } catch (error) {
                    console.error(error);
                }

               // {"sentences":["dit nummer is het alleen voor mijn\n        ouders\n        dus luister vooral mee\n        [Muziek]\n        [Muziek]\n        daar sta je dan bij de crematie van je\n        baan maar al die tijd van vruchten sta\n        je stil en denk je nou dit is nooit meer\n        vla\n        nooit meer vlak voor de tv\n        nooit meer slapen\n        dus laat me kijken naar tv d d doe je\n        dat ze in het huis en nooit meer klappen\n        met een vuist\n        misschien was het niet echt maar ik\n        wissels en ik is thuis\n        [Muziek]\n        daar sta je dan\n        bij de crematie van je baan allemaal\n        huilende gezichten\n        vond ik best normaal en ze was zo'n\n        lieve vrouw of zo veel dat ik zeg gewoon\n        van het spijt me sorry\n        want het is te koud voor jou waar ik\n        mijn geduld in een kistje onder bed maar\n        wat is een pretpark\n        zonder pret\n        vol gedaan 2009 daar dan kom ik mezelf\n        tegen maar we sneek verlegt de rivier en\n        dat ondanks alle geven\n        [Muziek]\n        hoe\n        hoe\n        peko\n        en gebruik nu allemaal dankjewel"]}
               
           

            //     console.log('FETCHING SUMMARY WITH TEXT')
            //     console.log(text)
            //     
            }
            fetchSummary()
            setLoading(false)
        }
    },[text])

    React.useEffect(() => {
        if (summary)
        {
            console.log("COMPLETE SUMMARY")
            console.log(summary)
            setLoading(true)
            async function fetchCompleteSummary() {
                // try {
                    const response = await openai.completions.create({
                            model:'text-davinci-003',
                            prompt: `Please return a summary in a Javascript object without a name. In this object create a summary of the text provided by generating a title for the summary, provide a short summary, outline the key points, and list the three most important topics based on the given summary. Explain each of these elements in a simple and clear manner, as if you were teaching a beginner. Return the summary items in a javascropt object with key and values. Text:${summary}. summary:`,
                            max_tokens:500,
                            })

                    if (!response.ok)
                    {
                        console.log(response)

                        // const jsonResponse = await response.json();
                        // const completeSummary = JSON.parse(jsonResponse.choices[0].text.trim());
                        console.log(response.choices[0].text.trim())
                        const trimmedObject = response.choices[0].text.trim()
                        
                        const regex = /\n/g;
                        const removedNewLinesObject = trimmedObject.replace(regex, '');
                        console.log(removedNewLinesObject)
                        const object = JSON.parse(removedNewLinesObject)
                        console.log(object)

                        // console.log(typeof response.choices[0].text)
                        // setCompleteSummary(JSON.parse(result.choices[0].text))
                        // console.log(JSON.parse(response.choices[0].text))
                        // console.log('compelte summary')
                        // console.log(completeSummary)
                        // throw {
                        //     message:"Failed to fetch Complete summary",
                        //     statusText: response.statusText,
                        //     status: response.statusText
                        // }
                    }
                    // console.log(response.data.choices[0].text.trim())
                    // const data = await response.json()
                    // console.log(data)
                    // response.data.choices[0].text.trim()
                // }
                // catch {
                //     console.error(error)
                //     setError(error)
                // }
            }

            fetchCompleteSummary()
            setLoading(false)
        }
    },[summary])

    return (
       <section className="m-5">
            <form onSubmit={handleSubmit}>
                <label></label>
                <input
                    type="text"
                    name="video"
                    value={youtubeUrl.video}
                    onChange={handleChange}
                    placeholder="Youtube Url"
                    required>
                </input>
                <button 
                type="submit">Submit</button>
            </form>
            {text ? text : null}
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            { loading ? <img src={loaderLogo}/> : null}
            { summary ? summary : null}
            !!!!!!!!!!!!!!!!!!!!!!!!!!!!
            {completeSummary ? 
                completeSummary.map((item) => {
                    return <><h1>item.title</h1></>
                }) 
                : null}
        </section>
    )
}