import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { keyword } = await req.json();

        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json(
                { error: "Missing GROQ_API_KEY" },
                { status: 500 }
            );
        }

        const groqResponse = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant", // ✅ Current working free model
                    messages: [
                        { role: "system", content: "You are Predixo, an AI forecasting assistant." },
                        { role: "user", content: `Predict upcoming trend for: ${keyword}` },
                    ],
                }),
            }
        );

        const result = await groqResponse.json();

        if (!groqResponse.ok) {
            console.log("GROQ API ERROR:", result);
            return NextResponse.json({ error: result }, { status: 500 });
        }

        return NextResponse.json({
            prediction: result.choices?.[0]?.message?.content || "No response",
        });

    } catch (error) {
        console.error("SERVER ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Unknown server error" },
            { status: 500 }
        );
    }
}
