const crypto = require('crypto');
const fs = require('fs');

// Read the public key from a file
const publicKeyString = fs.readFileSync('../keys/public_key.pem', 'utf8');
const publicKey = crypto.createPublicKey(publicKeyString);


// Read the private key from a file
const privateKeyString = fs.readFileSync('../keys/private_key.pem', 'utf8');
const privateKey = crypto.createPrivateKey(privateKeyString);

// Encryption parameters
const padding = crypto.constants.RSA_PKCS1_OAEP_PADDING;
const oaepHash = 'sha256';

// Define the plaintext to be encrypted and decrypted
const plaintext = '{\"statusType\":\"OK\",\"entity\":[{\"customerStatusId\":2,\"customerStatusName\":\"Data Received\",\"customerStatusDescription\":\"Data Received\"},{\"customerStatusId\":3,\"customerStatusName\":\"Data Verification In Progress\",\"customerStatusDescription\":\"Data Verification In Progress\"},{\"customerStatusId\":5,\"customerStatusName\":\"Data Verification Failed\",\"customerStatusDescription\":\"Data Verification Failed\"},{\"customerStatusId\":7,\"customerStatusName\":\"Credit Approved\",\"customerStatusDescription\":\"Credit Approved\"},{\"customerStatusId\":16,\"customerStatusName\":\"Temporary Block\",\"customerStatusDescription\":\"Temporary Block\"},{\"customerStatusId\":11,\"customerStatusName\":\"Permanent Block\",\"customerStatusDescription\":\"Permanent Block\"}],\"entityType\":\"java.util.ArrayList\",\"metadata\":{},\"status\":200}';

// Split the plaintext into smaller chunks
const chunkSize = 32;

// Encryption function
function encryptStringWithPublicKey(str, publicKey) {
    const numChunks = Math.ceil(str.length / chunkSize);
    const plaintextChunks = [];
    for (let i = 0; i < numChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, str.length);
        plaintextChunks.push(str.slice(start, end));
    }

    // Encrypt each plaintext chunk using the public key
    const ciphertextChunks = [];
    for (let i = 0; i < plaintextChunks.length; i++) {
        const chunk = plaintextChunks[i];
        const ciphertextChunk = crypto.publicEncrypt({
            key: publicKey,
            padding: padding,
            oaepHash: oaepHash
        }, Buffer.from(chunk, 'utf8'));
        ciphertextChunks.push(ciphertextChunk);
    }

    // Concatenate the encrypted chunks into the final ciphertext
    const ciphertext = Buffer.concat(ciphertextChunks).toString('base64');
    return ciphertext;
}

// Decryption function
function decryptStringWithPrivateKey(str, privateKey) {
    const ciphertext = Buffer.from(str, 'base64');

    // Split the ciphertext into smaller chunks
    const ciphertextChunks = [];
    for (let i = 0; i < ciphertext.length; i += 256) {
        ciphertextChunks.push(ciphertext.slice(i, i + 256));
    }

    // Decrypt each ciphertext chunk using the private key
    const decryptedChunks = [];
    for (let i = 0; i < ciphertextChunks.length; i++) {
        const chunk = ciphertextChunks[i];
        const decryptedChunk = crypto.privateDecrypt({
            key: privateKey,
            padding: padding,
            oaepHash: oaepHash
        }, chunk);
        decryptedChunks.push(decryptedChunk);
    }

    // Concatenate the decrypted chunks into the final plaintext
    const plaintext = Buffer.concat(decryptedChunks).toString('utf8');
    return plaintext;
}

// Encrypt the plaintext using the public key
const encryptedText = encryptStringWithPublicKey(plaintext, publicKey);
//console.log(`Encrypted text: ${encryptedText}`);
console.log("Encrypted text");
console.log(encryptedText)

const encryptedTextJava='MHhBodPjEDUo8EyJY+TB+sMOZktmT1lOUSCcwDT/7OV0OJ9uAHMTyW+Gr2QsfjZgk1DUDWuHGRFqYAVv4xgti3gJkQMO0dLL5Z4sjUU38Z9JWAzBWqOBY1tHcOSDM/Gzj5Mc8PqJq5SENHqlNCljsd2LTqa4hj8hvfTHqVrIMm2D+seSWJCB1iUoHfCS8OHbbH+qOg32LwHn4TDXfYX+KdbSrJaB5n2L4fBfM63dVP3T95FeFvzrWd5b/qXMlFHb71pybfYU80dEzjtOpf11p2niGqJ21/wBmyQ3qGOfNkesUVQp/DzAAf51vMfutwbM/6sdLuY9h4v9KAxb5uQvvzyThmdDKGOMmAygG3qg3MTAraWHlAyEQfi5kHz6ezOQZeAYg3L71pbYWIkgV1zEfzgsiUlERxZ2oEbLFvAnkOusnZkA46807XbRGwiuEB+A6h8ICj6w5pdEwWfa4c5fr0wz3pcr866lJyUF4uVH09JT5k7TJDopubDvAYm0k1DNtUEf+ieDKcCraAqq4V27ah8+1afyb4ROjFmrCT9OpbdW20LvJ5toQACvs6CzGZZtVZ5f5uJdwuFCLVhPqtshSEcK6wvrAszLw2D0wrtM6t7IR0dpq2QJXoVSKm7Fy2U6oSMqwSCwT8WR4MLmy7g56/QmIPjA5Nn9HtZHQWyQodtxsfO6YVunaqlbF3rzi6kSUiviIQ9megghkfFBTe7WTxMnlsavhku8jkXSiRJ5zEDT+zzDf0s8X94pXvsZPholGz1Cyab0SazStj5ZWkPPDk7/3hyFEwCHwXHl8oMx1qHCadKJ0NmU44/3S/GUM6OcU9LZZrpLOMcS/iTdKOlfmx0Pba5XP988wLW2rs83C1K+SXGHFKcXNjzsBOcEvd3vT8gASc5C0wCoNFdcBbu3HMX4UDTPv5IgZhrZKSWh/RThTq9vQopmufwu9UFbOJqotPf916U/MbCn6hI/JMgxANKfegkW/YXO2iUgKiUWP8p2CadiOkTBNmv1NlmwsoK3oPRZxcqHarEz5ItrsY1UbdZwJPYPjfYsQITpqKh6gyoFD+NjwftCworXFalCXh3gzvKt4ffBmHqaQWbCdEFJeqQkbXx9tanhX/DeUs+tu9sq7rBf/eSqHAUQplcSV0tKUgc/NMm8p7x1LLixJvbxfe8zXCiFEUb66oUCgR3jqoBkWbDrQUxenJkgqKlFdlHvfxsgRF3NzIDHOXeRp5sgSC5Bvq03/tNhZdViywJSEjk+udkwvIna+vu3hOo4BerWplNyXHmsLJ0439ajS0yGjr+yqrfORKVOOGDdNxN9Wu/DsicoHzWl5k9d29u53scBqx2NWKNrKHqyTCDOLCUZVUAiR1yksMCd/bizXAnns1WtJPOP7NRWMYtytA/jRosQiNuITuJsrqnUzzj0nNbraaamvgc2g9mXvN0MJZgkU7JEZrCQwJ2s+CmK2Ikl6gK6Vf6kOxiGvOTgkhEg1hoPNkZnNmDGRsP216R3wwcGahbZSFgqdCFFZ8CxYCowz0wrvb0vHEqPaGW5yp+KNMXscta19l52zB9ZfKwYPlVevUX8X5hnR48xv63z6b30qwI1G5gP9516yFt4EB5ODFebuiou/SCA6hfMDGMhgmWbUDNEPL62i9ulJB1m03Vb83WmLJVX2x1iI95tc6Hn3uN/yyaztMQokCV7Jbu+bIPjz/g=';
// Decrypt the ciphertext using the private key
const decryptedText = decryptStringWithPrivateKey(encryptedTextJava, privateKey);
console.log(`Decrypted text: ${decryptedText}`);
