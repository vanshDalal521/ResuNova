const axios = require('axios');
const http = require('http');

(async () => {
  try {
    let token;
    try {
        const res = await axios.post("http://localhost:3000/api/auth/register", {
            email: "test3@test.com",
            password: "password",
            name: "test3"
        });
        const cookie = res.headers['set-cookie'][0];
        token = cookie.split(';')[0];
    } catch(e) {
        const res = await axios.post("http://localhost:3000/api/auth/login", {
            email: "test3@test.com",
            password: "password"
        });
        const cookie = res.headers['set-cookie'][0];
        token = cookie.split(';')[0];
    }
    
    console.log("Token:", token);

    // Create a boundary manually if we don't install form-data
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    const body = `--${boundary}\r\nContent-Disposition: form-data; name="jobDescription"\r\n\r\ntest desc\r\n` +
                 `--${boundary}\r\nContent-Disposition: form-data; name="selfDescription"\r\n\r\ntest self\r\n` +
                 `--${boundary}--\r\n`;

    const response = await axios.post("http://localhost:3000/api/interview/", body, {
        headers: {
            "Content-Type": `multipart/form-data; boundary=${boundary}`,
            "Cookie": token
        }
    });
    
    console.log("SUCCESS", response.data);
  } catch (err) {
    if (err.response) {
      console.error("AXIOS ERROR:", err.response.status, err.response.data);
    } else {
      console.error("AXIOS ERROR:", err.message);
    }
  }
})();
