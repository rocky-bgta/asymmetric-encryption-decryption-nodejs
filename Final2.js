const crypto = require('crypto');

// Define the public key string obtained from the Java code
const publicKeyString = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr5N5HhEBir8iM0K4/2QHc/4mqg1m6wZFXo31Oe6lYr6/vF9oWlyxHcJUif0GqbvAvNafzBvpGJKub75KzYIHGYo/9ldT2/0K0MhJ3qssjK7VWQn8n+7Aq3q3NUvKXWxJbR+vokf02tkPndLZd71zc+WzK5Z5p63EDS1JvUPXKjMh4yufB4Q4kJex5JdHyD8jJ5Z5S5B1vJXhjO8g4o27fw2+4hrvNt7QW8zf0/OG7QRuq3vOj7xW8JbrR0yFJf08joHeG/fdh/K8zZiGVjZsmY42ft+DC9QsnmuTjK1T3Jq3GM6z1+6UajJZU7QjMnDrJX9xrvI+MYyHQIDAQAB";

// Convert the public key string to a buffer and create a public key object
const publicKeyBuffer = Buffer.from(publicKeyString, 'base64');
const publicKeyObject = crypto.createPublicKey({
    key: publicKeyBuffer,
    format: 'der',
    type: 'spki',
});

// Define the encrypted data buffer obtained from the Java code
const encryptedDataBuffer = Buffer.from("q3HAK94+ZzF/bM9SBMAWz0Jp5g5y5Y5Pr2ACB3eJr3QzZ6+DZAD9zA6UxV6lJy6DC0y+8uFOJsszyVwTExdNnCxDp8XruW/9v7rgJFbEYWy/jNf/aWtIvNML1mLZ41ajjlcmX4Ftq4xgStnFYyPjjJ8mR+RY1Sv18+IZyEPc=", 'base64');

// Use the public key object to create a decipher object
const decipher = crypto.createDecipheriv('rsa-cipher', publicKeyObject);

// Define the chunk size
const chunkSize = 128;

// Decrypt each chunk separately
let decryptedData = '';
for (let i = 0; i < encryptedDataBuffer.length; i += chunkSize) {
    const chunk = encryptedDataBuffer.slice(i, i + chunkSize);
    decryptedData += decipher.update(chunk);
}

// Concatenate the decrypted chunks to get the original message
decryptedData += decipher.final();
console.log(decryptedData);
