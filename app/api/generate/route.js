import { NextResponse } from "next/server";
import OpenAI from 'openai';

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:

1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards.
Remember, the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the following JSON format:
{
    "flashcards": [
        {
            "front": str,
            "back": str
        }
    ]
}
`;

export async function POST(req) {
  try {
    //Create a new instance of the OpenAI client
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": 'http://localhost:3000/', // Optional, for including your app on openrouter.ai rankings.
        "X-Title": 'Headstarter', // Optional. Shows in rankings on openrouter.ai.
      }
    });

    const data = await req.text(); // Retrieve text data from the request

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'gpt-4o-mini', // Specify the model
    });

    const flashcards = JSON.parse(completion.choices[0].message.content); // Parse the response content

    return NextResponse.json(flashcards.flashcards); // Return the flashcards as a JSON response
  } catch (error) {
    console.error("Error in POST /api/generate:", error); // Log the error for debugging
    return NextResponse.json({ error: error.message }, { status: 400 }); // Return a 400 Bad Request response with the error message
  }
}
