const crypto = require('crypto');

// Define the encrypted message and the public key in base64 format
const encryptedMessageBase64 = 'HziLFpcmCDd6PlOGQaenw9s9ciw4XFavLk2p+6d+1kLaScr0di1Unraysjmy0yJoM9Z/2oMG/FQkfgIlnt4Gm2i20fMKO4Q60auvOi/auJ1UvpmaSbFYC5tdjO5yr0RiG5P6hsH355njWqpqwxWJVWbX39+/TSF0zrOe+nTkSdecYqr+sj2+e7bmuIHko+m/Ob9h2mD2enVowdM+BAE1JpMffROjXutIyFccXzPIwnWL2z6Cv3jpg80oX1y5vrGhLuE+hivgNIp9s/wDymMFyAZkWrUAEnEGYkwdx5VXbSyCa6PD6LUy+ODFXOAWP6brG33oe+qCrn4ZiB2FAGCQPA=='; // replace with your encrypted message
const publicKeyBase64 = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt/oGqKCkliq5pIpRZFfx3w+6ZnLhFD49hV0w9gTrVPo381ub6E0PjRYMEILZCJmxvD4rgOmHgrzxtcssWHoBWwyP7LGsQRjxNOnanGyZHMObSy9av9JnJ2jsgv68bfepk69cKVR7f71+SF05faGwJz2lKP51qUThowlqSLXfb5Dt4Pvi+ntWzWBHWRPH9t+tSTRxEALYXSHiV5w/cJ2L529K1Bt9rwbf1jasGk0FPmSBaKXXJFhUvuSXBGT73kwoAJhu+l96ypAFbcd5ZXFGBfKXDL9XAxFDS5PpWjg3wLo4xRJiELHDrqzqpYconVHYw6qkLP+FuDla3IJ0e6MiwQIDAQAB
-----END PUBLIC KEY-----`;

// Decode the base64-encoded public key
const publicKey = publicKeyBase64;

// Decrypt the message with the public key
const encryptedMessage = Buffer.from(encryptedMessageBase64, 'base64');
const decryptedMessage = crypto.publicDecrypt(
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    }, encryptedMessageBase64);

// Convert the decrypted message to a string and log it
const message = decryptedMessage.toString('utf-8');
console.log(message);