import OpenAI from 'openai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true
})

const handler = async (event) => {
  try {
    const response = await openai.completions.create({
          model:'text-davinci-003',
          prompt: `Please return a list of 5 objects with multiple choice practice questions in a JSON format without a name based on a summary. Only base the questions on the topic in the summary. In this JSON object create a list with inside for each question a seperate object with properties: question, 1 correct answer and 3 wrong answers. example of response: [{"question": "question1", "correctAnswer": "", "wrongAnswers": ["", "", ""]}]. use the following summary for the questions:${event.body}. JSON object:`,
          max_tokens: 600,
          })
      
          const trimmedObject = response.choices[0].text.trim()
          const regex = /\n/g;
          const removedNewLinesObject = trimmedObject.replace(regex, '');
          const object = JSON.parse(removedNewLinesObject)
      
          const newObjectArray = object.map((questionObject) => {
               // save old value in list
               let answers = questionObject.wrongAnswers
               let answerToAdd = questionObject.correctAnswer 
               const randomIndex = Math.floor(Math.random() * 3);
               answers.splice(randomIndex, 0 , answerToAdd)
        
               // const answers = questionObject.wrongAnswers.splice(questionObject.correctAnswer, 0, randomNumber)
               const answersObjectArray = answers.map((answer) => {
                   return {
                       answer: answer,
                       isSelected: false
                   }
               })
               return {
                   question: questionObject.question,
                   answers: answersObjectArray,
                   correct: questionObject.correctAnswer
               }
            
          })  
      console.log(newObjectArray)             
      return {
      statusCode: 200,
      body: JSON.stringify({ value: newObjectArray}),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
