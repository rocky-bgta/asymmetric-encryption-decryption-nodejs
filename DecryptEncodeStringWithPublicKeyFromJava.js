const crypto = require('crypto');
const fs = require('fs');

//const privateKey = fs.readFileSync('private.pem', 'utf8');
//const publicKey = fs.readFileSync('public.pem', 'utf8');

const publicKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCnjO0435CBiwD/FNvllmrkIF54rV507jh+MTANsBoLRXB3UEckc5eKYijTv6X7NU1gndXneQloTkrqxkwhEeNWonLkmuvL6lbeHWr6LfL1fvWbhrb+TeZhQEjxRKVvQcLZ7D/NPPfCTyFilkBlKQFh83SBeekRsOKKVnpgnMyHYoFqIdzfeKeuRdEJclGDVt4p1whVfW08inwi5kfQTa7qRb056Zxhw9lkevw5W4vGSC9iqtnHPDzdolALSKQVahtflcmhCfiPw/lh3a07HskVadxpEoImGwN0Xdudxi38R6dSe38X5BV3J6VKc4DBDVQJ2yVGqwgJFi2S+QOBRHe1AgMBAAECggEAFBOp9U+stCkg5G/ubZNZmZ5bU6CKmf5VnKFuPaWlaUZX1KQ08iQ7u2RJuh3T2McpT3N6RzNUsj/3cCx0wN2w3Re4JrZ9nMCmyhTCVdodq9cbvRgmY1CYU3ztgKOWIz/BBnXtqz0r/weWW4bfjn+cX81ZX45pJCqK6sK0BVGknHA5yd5AjtqxrY/kdooHqZ453IYUTiNLBTWskJio5wf2TUY31AJqAt+9E5sQFxR1czeH2xJpSM7JQQ3/lJFVJqTc+ElabvkC3Nei3TOlajbO3ldWTHa+m0Mm1QlvYMbmcQwqY3sHn5ygv5K6d5ZpOGtgT+Luo6egrhQW/GJ8bOPTQQKBgQD5xDxFPhcRszpfz0i4VWokQBsB0oH/g/gjbgunwFPAavj1uYb3ndP4Kz4QtJwKmee3XPNCDBGAcVdOa11abneiw77zjwn+0C7In4McFHvTeanqZpdpUJahgP5TUK14qbqBxSQappN5Dgq3cr1bQbgK+aaQKyK8YsL8/pxsUIh85QKBgQCru2kuO/10+2rTf8ckjTcZ/Y59fa59YnzWqQNj7WSmYWwahhUOq4+mLPGPngbpZydJrfOxkzLA3JadhvvTFx6wHraz5Vt8gfyrVjTMGDAcRBWYPQ9SiLjEIfslhO32wBjJX6gSTgjZTIpthctPOspjyTJhlPzTd3zZZPKFBT0ykQKBgQCknKHAXQilQMOTS7E41AqNc7aY/91vwtFywF9sIwTPx3DnumvqnJmMcSuJpQ9GqWKfZeJpQDz0sz6AT6CKLk4o9uvN6BMFXr3GueKWSiXGHeRPuWfHIDb2oGZ+EKkT4oEqb/y4l9qQKSIE/9ku4ORkT19omxVcpZavWTtM49LgxQKBgDnSRh3NEQ+8P0Gq+jAyY+UaXEmgcYnCCWp1SbDxkzv5/V4I2zovRZSb+VFz0bvwgWfra+vUNfh9zTCI7G0skaaXEMkNZnpLgflmcyxs0HYT7nltxaTyZ9OR5W/CjCTSlQXocTyIja4seUdbDxNEJjTm31G/ykihKKZBuO5Uz0AhAoGBAO/Ym19ZnW7bhDfYLJweP8nMJRIYk8mamsGHfArXk5qh/I2c3QstjHDpCn9aqlpqUKoTk1R/g1R4qzM3eIlLwUn623WQ7ey9q1pNl1KFdXYQWQuoyk0MbVK7MUJNmqwPXaS91R8ntMA3s0KpLS5YmU852OBrdrUFJ6q8o8nigMYm
-----END PRIVATE KEY-----`;

const encryptedString = `aa0+AQiUKITaOPz/ufUOJR4Vzb2FrUcabe+oXAUFnFEhkpE/EOQ5yaXvgQ0o+sYtv0jLi9g6ZYWhLGvUHCmrz85SgvPiuncISLwkIedJ7rdvERrFE0VpEqZojQM6AUfdcIWlGzn/a4DZOS7yy1F4o+avEEJExH9t3P5PVObR13A7bB7basc1uxNDH8HfeNmd93vOalOsDOAeEKe6iaLlslGJWq8HehkrVo8Lff76J0yEsWMmFx81KXhWvKx/55Mrq8VZrKD+S/3J688X8Qg1CUbQFFuykm7kq09F+NKQiTWowjzWGjG1KqB9X7oD4LgpxKYIw6NTgqCZbfRkcQtp5g==`; // Encrypted data

// optional
const encryptedBuffer = Buffer.from(encryptedString, 'base64');

console.log(crypto.constants)

const padding = crypto.constants.RSA_PKCS1_OAEP_PADDING;
// Printing the constants
console.log(crypto.constants)

//const buffer = Buffer.from(encryptedData, 'base64');
//const decryptedString = crypto.publicDecrypt(publicKey, Buffer.from(encryptedBuffer, "base64")).toString();

const decryptedString = crypto.publicDecrypt({
    key: publicKey,
    padding: padding,
    oaepHash: "sha256"
}, Buffer.from(encryptedBuffer, 'base64')).toString();


console.log(decryptedString);