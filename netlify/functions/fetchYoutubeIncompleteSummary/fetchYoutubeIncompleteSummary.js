const TEXT_SUM_KEY = process.env.TEXT_SUM_KEY

const handler = async (event) => {
  try {
    const url = 'https://textanalysis-text-summarization.p.rapidapi.com/text-summarizer-text';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': TEXT_SUM_KEY,
                'X-RapidAPI-Host': 'textanalysis-text-summarization.p.rapidapi.com'
            },
            body: new URLSearchParams({
                text: event.body,
                sentnum: '8'
            })
        };
            
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
    return {
      statusCode: 200,
      body: JSON.stringify({ value: result.sentences.join('.')}),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }


