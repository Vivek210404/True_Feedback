import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "edge";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";


    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    if (!result?.response) {
      return NextResponse.json(
        {
          name: "EmptyResponseError",
          message: "Gemini API returned no response content",
        },
        { status: 502 }
      );
    }

    const text = result.response.text();

    return NextResponse.json({ questions: text }, { status: 200 });
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    if (error.status || error.code) {
      return NextResponse.json(
        {
          name: error.name || "GeminiAPIError",
          status: error.status || 500,
          message: error.message || "An error occurred with the Gemini API",
          details: error.details || null,
        },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      {
        name: "InternalServerError",
        message: "An unexpected error occurred on the server",
      },
      { status: 500 }
    );
  }
}
