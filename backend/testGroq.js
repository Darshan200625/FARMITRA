
require("dotenv").config();

async function testGroq() {
  const apiKey = process.env.GROQ_API_KEY;
  const model =
    process.env.GROQ_MODEL || "openai/gpt-oss-20b";

  if (!apiKey) {
    console.log("GROQ_API_KEY is missing from backend .env");
    return;
  }

  console.log("Testing FARMITRA Groq backup...");
  console.log("Active model:", model);

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content:
                "You are FarmMitra, an AI-powered smart agriculture assistant."
            },
            {
              role: "user",
              content:
                "Reply exactly: Hello FarmMitra, Groq backup is working!"
            }
          ],
          temperature: 0.5,
          max_tokens: 100
        }),
        signal: AbortSignal.timeout(30000)
      }
    );

    const result = await response.json();

    console.log("HTTP STATUS:", response.status);

    if (!response.ok) {
      console.log(
        "GROQ ERROR:",
        JSON.stringify(result, null, 2)
      );
      return;
    }

    console.log("GROQ RESPONSE:");
    console.log(
      result.choices?.[0]?.message?.content
    );

  } catch (error) {
    console.log("ERROR:", error.name);
    console.log("MESSAGE:", error.message);
  }
}

testGroq();
