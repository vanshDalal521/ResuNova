const axios = require('axios');
(async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/interview/", "dummyData", {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    console.log(response.data);
  } catch (err) {
    console.error("AXIOS ERROR:", err.message);
  }
})();
