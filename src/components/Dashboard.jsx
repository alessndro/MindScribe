import React from 'react'
import {linkIcon} from '../assets'
import loaderLogo from '../assets/loader.svg'
// import fetchTransscript, {fetchYoutubeSummary, fetchArticleSummary, fetchCompleteSummary, fetchPracticeQuestions} from '../functions/api'
import { fetchYoutubeSummary , fetchArticleSummary} from '../functions/api'
import fetchTransscript from '../functions/api'
import { v4 as uuidv4 } from 'uuid'
import { NavLink, Outlet } from 'react-router-dom'
import {collection, onSnapshot, addDoc} from 'firebase/firestore'
import { useAuth } from './AuthContext'
import { db } from '../Firebase'
import {useLocation, useNavigate} from 'react-router-dom'

export default function Dashboard() {
    // Initialize variables
    const [loading, setLoading] = React.useState()
    const [error, setError] = React.useState()
    const {currentUser} = useAuth()  
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate()

    // currentSummarizeObject is used to store the current summary that is created
    // The currentSummarizeObject's logic consists of first fetching an 'incomplete summary' from RAPID AI summarization api
    // In case of a youtube url, first the transscript is fetched, followed by an incomplete summary
    // This incomplete summary is used to fetch the OPEN AI API. I use first the rapid api to make the summary smaller, such that less tokens are used for OPEN AI API
    const [currentSummarizeObject, setCurrentSummarizeObject] = React.useState({
        url: '',
        userUid: '',
        youtubeId: '',
        articleId: '',
        isRan: false,
        isYoutube: false,
        isSelected: false,
        youtubeTransscript: '',
        incompleteSummary: '',
        completeSummary: {
            title: '',
            shortSummary: '',
            keyPoints: [],
            importantTopics: [],
        },
        practiceQuestions: [],
    })

    const [listOfAllSummaries, setListOfAllSummaries] = React.useState([])

    const activeStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline',
    }

    const selectedStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        backgroundColor: 'red'
    }

    // Firestore logica
    const summaryCollection = collection(db, "summaries")

    // Handle changes in form
    function handleChange(event) {

        setCurrentSummarizeObject(prevObject => {
            return {
                ...prevObject,
                [event.target.name]: event.target.value 
            }
        })
    }

    // Function to handle the form's submit
    function handleSubmit(event) {
        // Handle submit of youtube video
        event.preventDefault()

        const {url} = currentSummarizeObject

        // First check whether user puts in youtube url or not
        function validateYouTubeUrl(url){
            if (url) {
                var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                if (url.match(regExp)) {
                    // set toSummarizeObject's isYoutube to true
                    setCurrentSummarizeObject(prevObject => {
                        return {
                            ...prevObject,
                            isYoutube: true,
                            userUid: currentUser.uid
                        }
                    })
                    // Helper function retrieving ID from url
                    function getId(url) {
                        let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
                        return regex.exec(url)[3];
                    }
                    
                    // Retrieve url from state & ID after
                    const currentVideoID = getId(url)

                    setCurrentSummarizeObject(prevObject => {
                        return {
                            ...prevObject,
                            youtubeId: currentVideoID }
                    })
                }
                
                // If NOT youtube, it's article, provide article id
                else {
                    setCurrentSummarizeObject(prevObject => {
                        return {
                            ...prevObject,
                            articleId: uuidv4(),
                            userUid: currentUser.uid,
                        }
                    })
                }
            }
        }

        validateYouTubeUrl(url)
    }

    // https://stackoverflow.com/questions/74468493/firestore-fetch-api-cannot-load-due-to-access-control-checks
    // Because error regarding firestore
    React.useEffect(() => {
        const unloadCallback = () => {firebase.app().delete()}
        window.addEventListener("beforeunload", unloadCallback);
        return async () => {
          window.removeEventListener("beforeunload", unloadCallback);
        }
      }, [])


    function handleAddSummary() {
        // Function used to add summaries to Firestore

        // Retrieve all summaries existing in db with same url, listOfAllSummaries is synced with firestore
        const listObjectsCheck = listOfAllSummaries.filter((summary) => {
            return summary.url === currentSummarizeObject.url
        })
     
        // If not existing summaries with that specific url
        if (listObjectsCheck.length === 0) {
           
            // Add the current summary to Firestore
            async function createNewSummary() {
                const newSummary = {
                    ...currentSummarizeObject,
                    isRan: true,
                };
            
                const newNoteRef = await addDoc(summaryCollection, newSummary);
            }
            createNewSummary();
        }
        // Reset current object before search for new one
        setCurrentSummarizeObject({
            url: '',
            userUid: '',
            youtubeId: '',
            articleId: '',
            isRan: false,
            isYoutube: false,
            isSelected: false,
            youtubeTransscript: '',
            incompleteSummary: '',
            completeSummary: {
                title: '',
                shortSummary: '',
                keyPoints: [],
                importantTopics: [],
            },
            practiceQuestions: [],
        })

    }

    

    function handleSwitchCurrentSummary(url) {
        // Function used to switch the current Summary showed on dashboard

        // Search in firestore summary with specifc url
        const newList = listOfAllSummaries.filter((summary) => {
            return summary.url === url
        })

        setCurrentSummarizeObject(newList[0])
    }


    function handleNewSummarySearch() {
        // Function used to clear current summarize object, when searching for new article
        // Otherwise some attributes would already be filled in
        setCurrentSummarizeObject({
            url: '',
            userUid: '',
            youtubeId: '',
            articleId: '',
            isRan: false,
            isYoutube: false,
            isSelected: false,
            youtubeTransscript: '',
            incompleteSummary: '',
            completeSummary: {
                title: '',
                shortSummary: '',
                keyPoints: [],
                importantTopics: [],
            },
            practiceQuestions: [],
        })
    }

    // useEFfect for syncing firestore with state userSummaries
    React.useEffect(() => {
        const unsubscribe = onSnapshot(summaryCollection, function(snapshot) {
            
            const totalSummaries = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            const userSummaries = totalSummaries.filter((summary) => {
                return summary.userUid === currentUser.uid
            })

            setListOfAllSummaries(userSummaries)
        })
        return unsubscribe
    }, [])


    // BOTH USE EFFECTS FOR youtube video fetching transcript (1), summary (2)
    // (1) Fetch transscript from youtube video, if id is added
    React.useEffect(() => {
        if (currentSummarizeObject.youtubeId && !currentSummarizeObject.isRan)
        {
            async function fetchTransscriptData() {
                setLoading(true)
                try {
                    const data = await fetchTransscript(currentSummarizeObject.youtubeId)
                    setCurrentSummarizeObject(prevObject => {
                        return {
                            ...prevObject,
                            youtubeTransscript: data }
                   })
                } catch (error) {
                    setError(error)
                } finally {
                    setLoading(false)
                }
            }
            fetchTransscriptData()
           }
        }, [currentSummarizeObject.youtubeId])

    // (2) Fetch youtube's video summary with the transscript
    React.useEffect(() => {
        if (currentSummarizeObject.youtubeTransscript && !currentSummarizeObject.isRan)
        {
            const transString = currentSummarizeObject.youtubeTransscript
            async function fetchYoutubeSummaryData() {
                setLoading(true)
                try {
                    const data = await fetchYoutubeSummary(transString)
                    setCurrentSummarizeObject(prevObject => {
                        return {
                            ...prevObject,
                            incompleteSummary: data }})
                } catch (error) {
                    setError(error)
                } finally {
                    setLoading(false)
                }
            }
            fetchYoutubeSummaryData()
        }
    }, [currentSummarizeObject.youtubeTransscript])

     
    // // Fetch article's summary with the url
    React.useEffect(() => {
        if (currentSummarizeObject.articleId && !currentSummarizeObject.isRan)
        {
            async function fetchArticleSummaryData() {
                setLoading(true)
                try {
                    const data = await fetchArticleSummary(currentSummarizeObject.url)
                
                    setCurrentSummarizeObject(prevObject => {
                        return {
                            ...prevObject,
                            incompleteSummary: data }
                   })
                } catch (error) {
                    setError(error)
                } finally {
                    setLoading(false)

                }
            }
            fetchArticleSummaryData()
        }
    }, [currentSummarizeObject.articleId])
    
    // //  After either youtube url or article url created incomplete summary, use this incomplete summary and OPEN AI to fetch complete summary, including
    // // title, keypoints, short summary
    // React.useEffect(() => {
    //     if (currentSummarizeObject.incompleteSummary && !currentSummarizeObject.isRan)
    //     {
    //         console.log('@@@ 3 HANDLE FETCHING COMPLETE SUMMARY- OPEN AI @@@@')
    //         async function fetchCompleteSummaryData() {
    //             setLoading(true)
    //             try {
    //                 const inputSummary = currentSummarizeObject.incompleteSummary
    //                 const data = await fetchCompleteSummary(inputSummary)
    //                 setCurrentSummarizeObject(prevObject => {
    //                     return {
    //                         ...prevObject,
    //                         completeSummary:
    //                         {
    //                             ...data
    //                         }
    //                     }
    //                 })
    //             // Removed catching and also throwing error, because of This model version is deprecated. Migrate before January 4, 2024 to avoid disruption of service
    //             } finally {
    //                 setLoading(false)
    //             }
    //         }
    //         fetchCompleteSummaryData()
    //     }
    // }, [currentSummarizeObject.incompleteSummary])

    // // Fetch questions with answers for completed summaries 
    // React.useEffect(() => {
    //     if (currentSummarizeObject.completeSummary && !currentSummarizeObject.isRan)
    //     {
    //         // Fetch open AI to retrieve practice questions based on the complete summary
    //         async function fetchPracticeQuestionsData() {
    //             setLoading(true)
    //             try {
    //                 const completeSummary = currentSummarizeObject.completeSummary.shortSummary
    //                 const data = await fetchPracticeQuestions(completeSummary)
                   
    //                 setCurrentSummarizeObject(prevObject => {
    //                     return {
    //                         ...prevObject,
    //                         practiceQuestions:
    //                         [
    //                             ...data
    //                         ]
    //                     }
    //                 })
    //             // Removed catching and also throwing error, because of This model version is deprecated. Migrate before January 4, 2024 to avoid disruption of service
    //             } finally {
    //                 setLoading(false)
    //             }
    //         }
    //         fetchPracticeQuestionsData()
    //     }
    // }, [currentSummarizeObject.completeSummary])

    return (
        <div className='flex flex-col container mx-auto p-6 gap-4 md:flex-row'>
            <div className='flex flex-col  md:w-1/2'>
                
                <div className="bg-white-900 rounded-md shadow-xl p-10 flex flex-col items-center  gap-4 md:items-start sm:mb-5">
                    <h2 className='text-center font-bold text-2xl max-w-2xl md:text-left md:text-3xl'>The MindScribe Dashboard</h2>
                        <p className='max-w-md mt-5 font-light md:text-left text-center'>Welcome to the Mind Scribe Dashboard, your gateway to efficient and effective learning. Simply enter a youtube or article url, and let our AI-generated summaries empower your learning journey. Discover, learn, and excel like never before with Mind Scribe!</p> 
                        <form onSubmit={handleSubmit} className='relative mt-10 flex justify-center items-center max-w-sm' >
                            <img 
                                alt="link icon"
                                src={linkIcon}
                                className='absolute left-0 my-2 ml-3 w-5'
                                />
                            <input
                                    disabled={currentSummarizeObject.userUid ? true : false} 
                                    className='url_input peer'
                                    type="url"
                                    name="url"  
                                    value={currentSummarizeObject.url}
                                    onChange={handleChange}                  
                                    placeholder="Article or Youtube Url"
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
                <div className='bg-white-900 shadow-xl flex p-10 w-full flex-col  4 items-center md:items-start sm:mb-5'>
                    <h2 className='text-center mb-5 font-bold text-2xl max-w-2xl md:text-left md:text-3xl'>Your saved summaries</h2>
                    { listOfAllSummaries ? 
                        listOfAllSummaries.map((summary) => {
                       
                            return <div key={summary.url} onClick={() => handleSwitchCurrentSummary(summary.url)} className='px-3 mb-5 py-5 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer min-w-full overflow-x-auto'>
                                <p className=''>{summary.completeSummary.title}</p>
                            </div>
                        })

                    : <h1>No saved summaries..</h1>}
                 

                </div>
            </div>
            <div className='flex flex-col  bg-white-900 rounded-md shadow-xl md:w-1/2'>
                { currentSummarizeObject.incompleteSummary && currentSummarizeObject.incompleteSummary}
                {currentSummarizeObject.completeSummary && 
                    <div className='flex flex-col  bg-white-900 h-full p-10'>

                        <div className='w-full flex justify-between px-20'>
                        <NavLink
                            style={({isActive}) => isActive ? activeStyle : null}
                            to="."
                            end
                            className="border-r-3"
                        >Summary</NavLink>
                        <NavLink
                            style={({isActive}) => isActive ? activeStyle : null}
                            to="practice"
                        >Practice</NavLink>
                        <NavLink
                            style={({isActive}) => isActive ? activeStyle : null}
                            to="tutor"
                        >Tutor</NavLink>
                        </div>
                        <div className='min-w-md p-10 h-full border-green w-xl flex flex-col items-center justify-center'>
                            { loading ? <img src={loaderLogo}/> : currentSummarizeObject.completeSummary.title ? <Outlet context={{articleObject: currentSummarizeObject, setObject: setCurrentSummarizeObject}}/> : <div className='mb-10'><h1>Select or search summary first 🚀</h1></div>}
                            {pathname === '/dashboard' && !loading && currentSummarizeObject.userUid ? (
                                currentSummarizeObject.isRan === true ? <button className="purple-btn bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleNewSummarySearch}>Search new Summary</button> : <button className="purple-btn bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleAddSummary}>Save Summary</button>) : ''} 
                        </div>
                          
                       
                    
                         
                    </div>
                }
            </div>
        </div>
    )
}