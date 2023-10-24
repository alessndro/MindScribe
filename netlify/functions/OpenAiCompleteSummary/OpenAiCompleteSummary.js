import OpenAI from 'openai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true
})

const handler = async (event) => {
  try {
    const response = await openai.completions.create({
          model:'text-davinci-003',
          prompt: `Please return a summary in a JSON format without a name. In this JSON object create a summary of the text provided by generating a title for the summary with key title, provide a short summary with key shortSummary, outline the key points with key keyPoints, and list the three most important topics based on the given summary with key completeSummary. Explain each of these elements in a simple and clear manner, as if you were teaching a beginner. Return the summary items in a JSON object with key and values. example of response: 
          {"title": "This is a test title", "shortSummary": "Lorum ipsum servues magnus. Latinus magnus ceasar octivatus. Magnus madidi", "keyPoints": "["keypoint1: is lala plopa", "keypoint2: ik ga eventjes lekker dansen", "keypoints3: ik ben een rapper"], "importantTopics": "["important topic 1", "important topic 2"]}. use the following text:${event.body}. JSON object:`,
          max_tokens: 500,
          })
      
          const trimmedObject = response.choices[0].text.trim()
                              
          const regex = /\n/g;
          const removedNewLinesObject = trimmedObject.replace(regex, '');
      
          const object = JSON.parse(removedNewLinesObject)

    return {
      statusCode: 200,
      body: JSON.stringify({ value: object}),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
