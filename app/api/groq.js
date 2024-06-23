import Groq from 'groq-sdk'
import dotenv from 'dotenv'

dotenv.config()

const groq = new Groq({apiKey: process.env.GROQ_API_KEY})

export async function main() {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "system",
          "content": "You are an ATS Scanner for Resumes. For each resume inputted, you will give a ATS score from 0-100, based on how well the given resumes matches the key words on the job description. "
        },
        {
          "role": "user",
          "content": ""
        }
      ],
      "model": "llama3-8b-8192",
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": true,
      "stop": null
    });
  
    for await (const chunk of chatCompletion) {
      process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }
  }
  
  main();

