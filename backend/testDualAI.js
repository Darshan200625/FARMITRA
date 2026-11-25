
require("dotenv").config();

const API_URL = "https://farmitra-bgf4.onrender.com/api/chat";

async function testDualAI() {

  console.log("");
  console.log("========================================");
  console.log("FARMITRA DUAL AI INTEGRATION TEST");
  console.log("========================================");

  console.log("Gemini model:", process.env.GEMINI_MODEL);
  console.log("Groq model:", process.env.GROQ_MODEL);

  if (!process.env.GEMINI_API_KEY) {
    console.log("WARNING: Gemini API key is missing.");
  }

  if (!process.env.GROQ_API_KEY) {
    console.log("WARNING: Groq API key is missing.");
  }

  try {

    console.log("");
    console.log("Sending test message to FARMITRA backend...");

    const response = await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        message:
          "Hello FarmMitra. Reply with a short farming tip for tomato farmers.",

        history: []

      }),

      signal: AbortSignal.timeout(120000)

    });

    const result = await response.json();

    console.log("");
    console.log("HTTP STATUS:", response.status);

    console.log("API RESPONSE:");
    console.log(JSON.stringify(result, null, 2));

    if (!response.ok || !result.success) {

      console.log("");
      console.log("FARMITRA TEST FAILED.");
      console.log("Error:", result.message || "Unknown error");

      return;

    }

    console.log("");
    console.log("========================================");
    console.log("FARMITRA TEST SUCCESSFUL");
    console.log("========================================");

    console.log("AI PROVIDER USED:", result.provider || "Not reported");

    console.log("ASSISTANT:", result.assistant);

    console.log("");
    console.log("FARMMITRA RESPONSE:");
    console.log(result.reply);

    if (result.provider === "Groq") {

      console.log("");
      console.log("SUCCESS: GROQ BACKUP PROVIDER VERIFIED.");

    } else if (result.provider === "Gemini") {

      console.log("");
      console.log("SUCCESS: GEMINI PRIMARY PROVIDER VERIFIED.");
      console.log("Groq fallback was not needed for this request.");

    } else {

      console.log("");
      console.log("WARNING: Provider identification is missing.");

    }

  } catch (error) {

    console.log("");
    console.log("FARMITRA CONNECTION ERROR");
    console.log("ERROR:", error.name);
    console.log("MESSAGE:", error.message);

    console.log(
      "Check whether the backend is running on port 5000."
    );

  }

}

testDualAI();
