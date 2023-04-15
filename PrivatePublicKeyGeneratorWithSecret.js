const crypto = require("crypto");
let {privateKey, publicKey} = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: "spki",
        format: "pem"
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: "aes-128-cbc",
        passphrase: "abcdef"
    }
});

console.log("Private Key")
console.log(privateKey)

console.log("Public key")
console.log(publicKey)

const encryptedString = crypto.privateEncrypt({
    key: privateKey,
    passphrase: "abcdef"
}, Buffer.from("The quick brown fox jumps over the lazy dog")).toString("base64");

const decryptedString = crypto.publicDecrypt(publicKey, Buffer.from(encryptedString, "base64")).toString();
console.log(`Encrypted: ${encryptedString}`);
console.log(`Decrypted: ${decryptedString}`);