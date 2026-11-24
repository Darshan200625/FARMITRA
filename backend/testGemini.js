
require("dotenv").config();

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = "gemini-3.1-flash-lite";

  if (!apiKey) {
    console.log("GEMINI_API_KEY is missing.");
    return;
  }

  console.log("Testing FARMITRA Gemini API...");
  console.log("Active model:", model);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "Reply exactly: Hello FarmMitra, AI is working!"
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 100,
            temperature: 0.7
          }
        }),
        signal: AbortSignal.timeout(30000),
      }
    );

    const result = await response.json();

    console.log("HTTP STATUS:", response.status);

    if (!response.ok) {
      console.log("GEMINI ERROR:");
      console.log(JSON.stringify(result, null, 2));
      return;
    }

    const reply = result.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("\n");

    console.log("GEMINI RESPONSE:");
    console.log(reply || "No text response returned.");

  } catch (error) {
    console.log("ERROR:", error.name);
    console.log("MESSAGE:", error.message);
  }
}

testGemini();
