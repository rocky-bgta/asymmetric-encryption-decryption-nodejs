const forge = require('node-forge');

const publicKeyPem = '-----BEGIN PUBLIC KEY-----\n' +
    'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA0aMGZv4JtWp7V4ZXy0g4\n' +
    'LhrW8Vf93GJ9XZNXvNQaA18fHJbKwtsrrzfNv5RLstH5Y5F5mmJ9ZrCmle+U6WEC\n' +
    '6ShJc3GdIQ6YivY6DQry9UDjLpl2UMe0dbDYdKw0D+Hjz20ck62Jg5p5Bge12K7r\n' +
    'bR8/yfPwI66xU6jTx3pj3P/AoOQryeDjK9pi+pb3qKjB3mQ+TJy2hDnSK+eRjLzy\n' +
    '9XNtKj7VgWzN4AQH4x4tyE2ffBXnM+nsoJ/91ZS9ERtDgocV7WpH1DzV4a4EtylS\n' +
    'HQFM++S7XbPh+qnvjagOoCrYSiUsA1z34/vD/pBexYKsDsLLZoVlTULfKgEBcQIs\n' +
    'bI/ElBoznmWnL9ZjzDWISq3f7aqNtW8uV7IKaAeeGwAQrT1HbBxZ9+jcTJEMghM7\n' +
    'MctiE/lYpJMPcSutSAbWxPb9OZdVNp1wb4/W1UW8mcUPTQfUluC6vJf2hTYDxX9Z\n' +
    '5f5ce5W8hB/jGXcImoq3ahv53QWnKWfRZ1NgnB6zN5NT5W5TGn/5d5pjIm3+cnS6\n' +
    'Zb+gFWBy6Mro4HATWJ6xxHRU6QizUfCdfddGzebOXxO9XgqqfTANOCsPPsBTKOcp\n' +
    'AHGR1wz/jCvMbo0x9XJFISCU3q7vcOGQb+u8Rt1GzytYwUVr7zJmgiM2Z9Xm73/C\n' +
    's8/KJUPypr+EkKifpCkoJN8CAwEAAQ==\n' +
    '-----END PUBLIC KEY-----';

const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

const plaintext = 'Hello, world!';
const encrypted = publicKey.encrypt(plaintext, 'RSA-OAEP');

console.log(forge.util.encode64(encrypted));
