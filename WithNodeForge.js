const forge = require('node-forge');

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4LDRuKsMXxPzb3fy9Wk2
Ai3BhbtNlLCzeqwpFQUVgqT6sHYN8eQ4wI1vZ4ecSMsYxeInv8QeRlc0zqFewueV
ntNcV2DQXTDshJqbQn8sYPUbkxNA0waoQTlsyIQR28uMd5WfgyQwA/HCwWUetWIc
HfbrF06ztI8QRCzD+80qoB1fo7Tr0g5Lxd/Am9w5UAtGgXGoo+SvxF19Os1NKD4s
Ciq7RUqp2sWbn5Re03lPS9ZfprQWFzxzbLI3NT7t4ybEUjPlAvN8SjtkDqHBHQwc
FeQZ4UEUsqaO2eMtFPOvCfO8LKmr16yPnhzX0S0RxeLvSVUFXwc38KNDHZr7Pw9O
9QIDAQAB
-----END PUBLIC KEY-----`;

const encryptedString = 'FusKWTYp23VcG/qCJlIq3YTtvbiWW97YQPi+gGONvdD9YYZt8JSJOc5V+REk9wfj5LmMyWzxBiGFoClB0uycIT99bakbZ6vWU6C+bKgca3rpfxhYYts82NXT7JL5nnA0agza7Z3Wmzp4hEicx4jdJagvT1GTPsq605PMiZAnTMMICR3YLLRBpXWTuX0sRPR0CNPGg0Y0nM8qFJhEg+UrpipHY0Eu3zqA9rkebmJ4DCKIeNttp//PmOW5zBxT1hCcgBvVbULpUsGmPGxgtieOsHKGkaDblySP1iP8ZZi+56QL7qtnlSNlRX06KAw4dMyA0vDPxK5Qol6NKJxcaXMIUw==';

const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);

// Convert the base64-encoded string to a byte buffer
const encryptedBuffer = forge.util.decode64(encryptedString);

// Decrypt the encrypted buffer using the public key
const decryptedBuffer = publicKeyObj.decrypt(encryptedBuffer);

// Convert the decrypted buffer to a string
const decryptedString = decryptedBuffer.toString('utf8');

console.log(decryptedString);
