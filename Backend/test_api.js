require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function test() {
    const models = [
        "gemini-2.5-flash",
        "gemini-2.5-pro",
        "gemini-2.0-flash",
        "gemini-flash-latest",
        "gemini-pro-latest",
        "gemini-3.1-pro-preview",
        "gemini-3-flash-preview",
        "gemini-3.1-flash-lite-preview"
    ];

    for (const model of models) {
        try {
            console.log(`\nTesting ${model}...`);
            const result = await ai.models.generateContent({
                model: model,
                contents: [{ role: "user", parts: [{ text: "Hi" }] }]
            });
            console.log(`✅ Success for ${model}:`, result.text);
            return; // Stop if we find a working one
        } catch (error) {
            console.error(`❌ Failed ${model}:`, error.message);
        }
    }
}

test();
