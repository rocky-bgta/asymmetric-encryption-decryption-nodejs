const forge = require('node-forge');

// generate a keypair
const keys = forge.pki.rsa.generateKeyPair(2048);

// get the private key in PEM format
const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);

console.log("private key");
console.log(privateKeyPem);

// get the public key in PEM format
const publicKeyPem = forge.pki.publicKeyToPem(keys.publicKey);

console.log("Public key");
console.log(publicKeyPem);