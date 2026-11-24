
const SYSTEM_PROMPT = `
You are FarmMitra, an AI-powered smart agriculture assistant.

IDENTITY:
- Your name is FarmMitra.
- Never introduce yourself as Gemini, Groq or AgriTwin AI.
- If asked who you are, say:
  "I am FarmMitra, your AI-powered smart agriculture assistant."

YOUR RESPONSIBILITIES:
1. Crop management and farming guidance.
2. Soil health and soil analysis.
3. Fertilizer recommendations.
4. Plant disease information.
5. Smart irrigation guidance.
6. Weather-related farming advice.
7. Agricultural best practices.
8. Agricultural market and farming business guidance.
9. Crop yield improvement.
10. Sustainable agriculture.

INSTRUCTIONS:
- Give simple, practical and accurate answers.
- Answer in the farmer's language whenever possible.
- Provide step-by-step instructions when useful.
- Never invent weather readings.
- Never guarantee crop yields.
- Never claim to have live market data unless provided.
- Recommend laboratory soil testing for accurate NPK and pH values.
- Explain technical farming concepts in simple language.
- Never invent crop prices, weather readings or government schemes.
`;

// ==========================================
// AI MODEL CONFIGURATION
// ==========================================

const GEMINI_MODEL =
  process.env.GEMINI_MODEL || "gemini-flash-lite-latest";

const GROQ_MODEL =
  process.env.GROQ_MODEL || "openai/gpt-oss-20b";

const TEST_GROQ_FALLBACK =
  process.env.FARMITRA_TEST_GROQ_FALLBACK === "true";

console.log("========================================");
console.log("FARMMITRA DUAL AI CONTROLLER LOADED");
console.log("Primary AI:", GEMINI_MODEL);
console.log("Backup AI:", GROQ_MODEL);
console.log("Groq fallback test mode:", TEST_GROQ_FALLBACK);
console.log("========================================");

// ==========================================
// WAIT FUNCTION
// ==========================================

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ==========================================
// PREPARE CONVERSATION
// ==========================================

const prepareConversation = (message, history) => {

  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT
    }
  ];

  if (Array.isArray(history)) {

    history
      .filter(
        (item) =>
          item &&
          ["user", "assistant", "model"].includes(item.role) &&
          typeof item.text === "string"
      )
      .slice(-10)
      .forEach((item) => {

        messages.push({
          role: item.role === "user" ? "user" : "assistant",
          content: item.text
        });

      });

  }

  messages.push({
    role: "user",
    content: message.trim()
  });

  return messages;
};

// ==========================================
// GEMINI PRIMARY PROVIDER
// ==========================================

const generateWithGemini = async (prompt, apiKey) => {

  const maxAttempts = 2;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {

    try {

      console.log(`Gemini attempt ${attempt}/${maxAttempts}`);
      console.log("Gemini model:", GEMINI_MODEL);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },

          body: JSON.stringify({

            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],

            systemInstruction: {
              parts: [
                {
                  text: SYSTEM_PROMPT
                }
              ]
            },

            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 1024
            }

          }),

          signal: AbortSignal.timeout(45000)

        }
      );

      const result = await response.json();

      console.log("Gemini HTTP STATUS:", response.status);

      if (!response.ok) {

        const error = new Error(
          result.error?.message || "Gemini request failed."
        );

        error.status = response.status;
        error.details = result;

        throw error;
      }

      const reply = result.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("\n")
        .trim();

      if (!reply) {
        throw new Error("Gemini returned an empty response.");
      }

      console.log("Gemini primary provider successful.");

      return reply;

    } catch (error) {

      console.error("Gemini attempt failed:", error.message);
      console.error("Gemini status:", error.status || "Network error");

      const temporary =
        !error.status ||
        [429, 500, 502, 503, 504].includes(error.status) ||
        error.name === "TimeoutError" ||
        error.name === "AbortError";

      if (!temporary || attempt === maxAttempts) {
        throw error;
      }

      console.log("Retrying Gemini in 1 second...");

      await wait(1000);

    }

  }

  throw new Error("Gemini provider failed.");

};

// ==========================================
// GROQ BACKUP PROVIDER
// ==========================================

const generateWithGroq = async (messages, apiKey) => {

  console.log("Connecting to Groq backup provider...");
  console.log("Groq model:", GROQ_MODEL);

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },

      body: JSON.stringify({

        model: GROQ_MODEL,

        messages: messages,

        temperature: 0.5,

        max_tokens: 1024

      }),

      signal: AbortSignal.timeout(60000)

    }
  );

  const result = await response.json();

  console.log("Groq HTTP STATUS:", response.status);

  if (!response.ok) {

    console.error("Groq API error:", result);

    const error = new Error(
      result.error?.message || "Groq request failed."
    );

    error.status = response.status;
    error.details = result;

    throw error;
  }

  const reply =
    result.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    throw new Error("Groq returned an empty response.");
  }

  console.log("Groq backup provider successful.");

  return reply;

};

// ==========================================
// MAIN CHAT CONTROLLER
// ==========================================

const chatWithAI = async (req, res) => {

  console.log("");
  console.log("========== FARMMITRA CHAT STARTED ==========");
  console.log("FARMITRA DUAL PROVIDER CONTROLLER CALLED");

  try {

    // GET USER MESSAGE

    const {
      message,
      history = []
    } = req.body || {};

    console.log("Farmer Message:", message);

    // VALIDATE MESSAGE

    if (
      typeof message !== "string" ||
      !message.trim()
    ) {

      return res.status(400).json({
        success: false,
        message: "Please enter a valid message."
      });

    }

    // CHECK API KEYS

    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    console.log("Gemini key configured:", Boolean(geminiKey));
    console.log("Groq key configured:", Boolean(groqKey));

    if (!geminiKey && !groqKey) {

      return res.status(500).json({
        success: false,
        message: "No AI provider API keys are configured."
      });

    }

    // PREPARE CONVERSATION

    const messages = prepareConversation(message, history);

    const previousConversation = messages
      .filter((item) => item.role !== "system")
      .map((item) => {

        const speaker =
          item.role === "user" ? "Farmer" : "FarmMitra";

        return `${speaker}: ${item.content}`;

      })
      .join("\n\n");

    const geminiPrompt = `
PREVIOUS CONVERSATION AND LATEST QUESTION:

${previousConversation}

Respond as FarmMitra.
`;

    let reply = "";
    let provider = "";

    // ==========================================
    // TRY GEMINI FIRST
    // ==========================================

    if (TEST_GROQ_FALLBACK) {

      console.log("TEST MODE ENABLED: Skipping Gemini.");
      console.log("Testing Groq automatic fallback.");

    } else if (geminiKey) {

      try {

        console.log("Trying primary provider: Gemini");

        reply = await generateWithGemini(
          geminiPrompt,
          geminiKey
        );

        provider = "Gemini";

      } catch (geminiError) {

        console.error("Gemini provider unavailable.");
        console.error("Gemini error:", geminiError.message);
        console.error("Gemini status:", geminiError.status || "Network error");

      }

    } else {

      console.log("Gemini key missing. Skipping primary provider.");

    }

    // ==========================================
    // AUTOMATIC GROQ FALLBACK
    // ==========================================

    if (!reply && groqKey) {

      try {

        console.log("Switching to backup provider: Groq");

        reply = await generateWithGroq(
          messages,
          groqKey
        );

        provider = "Groq";

      } catch (groqError) {

        console.error("Groq backup failed.");
        console.error("Groq error:", groqError.message);
        console.error("Groq status:", groqError.status || "Network error");

        return res.status(503).json({
          success: false,
          message: "FarmMitra is temporarily unavailable. Both AI providers could not respond."
        });

      }

    }

    // NO PROVIDER AVAILABLE

    if (!reply) {

      return res.status(503).json({
        success: false,
        message: "FarmMitra AI is temporarily unavailable."
      });

    }

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    console.log("AI PROVIDER USED:", provider);
    console.log("FarmMitra response generated successfully.");

    console.log("========== FARMMITRA CHAT COMPLETED ==========");
    console.log("");

    return res.status(200).json({

      success: true,

      reply: reply,

      assistant: "FarmMitra",

      provider: provider

    });

  } catch (error) {

    console.error("========== FARMMITRA CONTROLLER ERROR ==========");
    console.error("Error:", error.message);
    console.error("Full error:", error);

    return res.status(500).json({

      success: false,

      message: "FarmMitra encountered an unexpected error.",

      details:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined

    });

  }

};

// ==========================================
// EXPORT CONTROLLER
// ==========================================

module.exports = {
  chatWithAI
};
