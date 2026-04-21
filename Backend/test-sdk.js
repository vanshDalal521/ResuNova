require("dotenv").config();
const { generateInterviewReport } = require("./src/services/ai.service");

(async () => {
    try {
        const result = await generateInterviewReport({
            resume: "This is a test resume.",
            selfDescription: "This is a test self description.",
            jobDescription: "Software Engineer"
        });
        console.log("Success:", result);
    } catch (e) {
        console.error("Error:", e);
    }
})();
