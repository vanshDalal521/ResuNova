require("dotenv").config();
const { generateInterviewReport } = require("./src/services/ai.service");

async function test() {
    try {
        const result = await generateInterviewReport({
            resume: "Software Engineer with 5 years experience in React and Node.js",
            selfDescription: "I am a full stack developer",
            jobDescription: "Senior Full Stack Dev. Needs React, Node, AWS."
        });
        console.log("Success:", result);
    } catch (e) {
        console.error("Error:", e);
    }
}
test();
