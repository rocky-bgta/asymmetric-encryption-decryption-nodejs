const crypto = require('crypto');
const fs = require('fs');

// Read the public key from a file
const publicKeyString = fs.readFileSync('../keys/public_key.pem', 'utf8');
const publicKey = crypto.createPublicKey(publicKeyString);

//console.log('Public key:');
//console.log(publicKeyString);

// Read the private key from a file
const privateKeyString = fs.readFileSync('../keys/private_key.pem', 'utf8');
const privateKey = crypto.createPrivateKey(privateKeyString);

//console.log('Private key:');
//console.log(privateKeyString);

// Encryption parameters
const padding = crypto.constants.RSA_PKCS1_OAEP_PADDING;
const oaepHash = 'sha256';
const chunkSize = 190; // bytes

// Encrypt function
function encryptWithPublicKey(plaintext, publicKey) {
    let encryptedChunks = [];
    let offset = 0;
    while (offset < plaintext.length) {
        const chunk = plaintext.slice(offset, offset + chunkSize);
        const encryptedChunk = crypto.publicEncrypt({
            key: publicKey,
            padding,
            oaepHash,
        }, Buffer.from(chunk));
        encryptedChunks.push(encryptedChunk.toString('base64'));
        offset += chunkSize;
    }
    return encryptedChunks.join('');
}

// Decrypt function
function decryptWithPrivateKey(encryptedChunks, privateKey) {
    const chunks = encryptedChunks.split(',');
    let decryptedChunks = [];
    chunks.forEach((encryptedChunk) => {
        const decryptedChunk = crypto.privateDecrypt({
            key: privateKey,
            padding,
            oaepHash,
        }, Buffer.from(encryptedChunk, 'base64'));
        decryptedChunks.push(decryptedChunk);
    });
    return decryptedChunks.join('');
}

// Example usage
const plaintext = '{\"statusType\":\"OK\",\"entity\":[{\"customerStatusId\":2,\"customerStatusName\":\"Data Received\",\"customerStatusDescription\":\"Data Received\"},{\"customerStatusId\":3,\"customerStatusName\":\"Data Verification In Progress\",\"customerStatusDescription\":\"Data Verification In Progress\"},{\"customerStatusId\":5,\"customerStatusName\":\"Data Verification Failed\",\"customerStatusDescription\":\"Data Verification Failed\"},{\"customerStatusId\":7,\"customerStatusName\":\"Credit Approved\",\"customerStatusDescription\":\"Credit Approved\"},{\"customerStatusId\":16,\"customerStatusName\":\"Temporary Block\",\"customerStatusDescription\":\"Temporary Block\"},{\"customerStatusId\":11,\"customerStatusName\":\"Permanent Block\",\"customerStatusDescription\":\"Permanent Block\"}],\"entityType\":\"java.util.ArrayList\",\"metadata\":{},\"status\":200}';
const encryptedChunks = encryptWithPublicKey(plaintext, publicKey);
console.log('Encrypted data (in chunks):');
console.log(encryptedChunks);

const decryptedPlaintext = decryptWithPrivateKey(encryptedChunks, privateKey);
console.log('Decrypted plaintext:');
console.log(decryptedPlaintext);
