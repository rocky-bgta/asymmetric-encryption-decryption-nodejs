const forge = require('node-forge');

const privateKeyPem = '-----BEGIN PRIVATE KEY-----\n' +
    // paste your private key here
    '-----END PRIVATE KEY-----';

const encrypted = '...'; // paste the encrypted message here

const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

const decrypted = privateKey.decrypt(forge.util.decode64(encrypted), 'RSA-OAEP');

console.log(decrypted);