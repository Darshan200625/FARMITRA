
require("dotenv").config();

const uri = process.env.MONGO_URI || "";

console.log("MongoDB URI loaded:", Boolean(uri));
console.log("Correct prefix:", uri.startsWith("mongodb+srv://"));
console.log(
  "Contains placeholders:",
  uri.includes("<") || uri.includes(">")
);

try {
  const parsed = new URL(uri);

  console.log("Hostname:", parsed.hostname);
  console.log("Database:", parsed.pathname);
  console.log("URL structure: VALID");
} catch (error) {
  console.log("URL structure: INVALID");
  console.log("Reason:", error.message);
}
