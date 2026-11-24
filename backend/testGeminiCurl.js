
require("dotenv").config();
const { spawn } = require("child_process");

const key = process.env.GEMINI_API_KEY;

if (!key) {
  console.log("Gemini API key missing.");
  process.exit(1);
}

const body = JSON.stringify({
  contents: [
    {
      parts: [{ text: "Reply with Hello FarmMitra" }]
    }
  ],
  generationConfig: {
    maxOutputTokens: 32
  }
});

const args = [
  "-i",
  "--max-time", "30",
  "-X", "POST",
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
  "-H", "Content-Type: application/json",
  "-H", `x-goog-api-key: ${key}`,
  "-d", body
];

console.log("Testing Gemini using Windows cURL...");

const child = spawn("curl.exe", args);

child.stdout.on("data", data => {
  process.stdout.write(data);
});

child.stderr.on("data", data => {
  process.stdout.write(data);
});

child.on("close", code => {
  console.log("\ncURL exit code:", code);
});
