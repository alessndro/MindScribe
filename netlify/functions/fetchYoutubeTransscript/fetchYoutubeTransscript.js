
const TEXT_SUM_KEY = process.env.TEXT_SUM_KEY

const handler = async (event) => {
  try {
    console.log(TEXT_SUM_KEY)
    console.log(event.body)
    const url = `https://youtube-transcriptor.p.rapidapi.com/transcript?video_id=${event.body}&lang=en`;
    const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': TEXT_SUM_KEY,
                'X-RapidAPI-Host': 'youtube-transcriptor.p.rapidapi.com'
            }
    }
    const response = await fetch(url, options);
    if (!response.ok) {
            throw {
                    message:"Failed to fetch transcript",
                    statusText: response.statusText,
                    status: response.statusText
            }
    }
    const result = await response.json();
    const transscript = result[0].transcription.map((sentence) => {
        return sentence.subtitle
    })
       
    console.log(transscript)
    return {
      statusCode: 200,
      body: JSON.stringify(
        { value: transscript 
        }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }


