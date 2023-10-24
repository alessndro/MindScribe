import OpenAI from 'openai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true
})

const handler = async (event) => {
  try {
    const requestData = JSON.parse(event.body); // Parse the JSON request body

    const shortSummary = requestData.shortSummary;
    const prevQuestion = requestData.prevQuestion;

    const response = await openai.completions.create({
          model:'text-davinci-003',
          prompt: `You are a highly knowledgeable assistant that is always happy to help. You gave the student the following summary:${shortSummary}. Now the student asks you ${prevQuestion}. Respond the question in a friendly and supportive but also concise manner`,
          max_tokens: 500,
          })
      
          const data = response.choices[0].text.trim()
          const trimmedText = data.trim().replace(/^\. */, '');        
    return {
      statusCode: 200,
      body: JSON.stringify({ value: trimmedText }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }


