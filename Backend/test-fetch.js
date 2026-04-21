(async () => {
  try {
    let token;
    try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: "test4@test.com", password: "password", name: "test4" })
        });
        const cookie = res.headers.get('set-cookie');
        if (cookie) token = cookie.split(';')[0];
    } catch(e) {}
    
    if (!token) {
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: "test4@test.com", password: "password" })
        });
        const cookie = res.headers.get('set-cookie');
        if (cookie) token = cookie.split(';')[0];
    }
    
    console.log("Token:", token);

    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    const body = `--${boundary}\r\nContent-Disposition: form-data; name="jobDescription"\r\n\r\ntest desc\r\n` +
                 `--${boundary}\r\nContent-Disposition: form-data; name="selfDescription"\r\n\r\ntest self\r\n` +
                 `--${boundary}--\r\n`;

    const response = await fetch("http://localhost:3000/api/interview/", {
        method: 'POST',
        headers: {
            "Content-Type": `multipart/form-data; boundary=${boundary}`,
            "Cookie": token
        },
        body
    });
    
    const data = await response.json().catch(e => null) || await response.text();
    console.log("SUCCESS:", response.status, data);
  } catch (err) {
    console.error("FETCH ERROR:", err);
  }
})();
