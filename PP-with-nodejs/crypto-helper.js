const crypto = require('crypto');
const fs = require('fs');

// Crypto helper - encryption and deccryption of string using PEM public or private keys from files.
// Works with keys created using openssl:
/*
Without passphrase:
openssl genrsa -out pvkey.pem 4096
openssl rsa -in pvkey.pem -outform PEM -pubout -out pbkey.pem
*/

const publicKey = '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArUqb0FiaIv/sEnTo1J8z\n' +
    'rAA2nBJt3oRqI83kJcrZ7hwVYy0mI+QG+wxFmMUah8dZ1sIB6G5R+6zG4vJpXyYF\n' +
    'pw2lWcWAKZzu6uKub8KxFHMbrCLyoH5sxZlEz+YThZK6u04EHHLnq7q5UKbmyL/H\n' +
    'y08IlJzuTUfEf8XUrIXSRub6hCUYIQnbxK2EiYwApFwd0dAsxzegEcdnA7sg2066\n' +
    '50VphL2btRqJ57g2zcta6bQNjo+G6MUrvXbGtvb3s1F6tynxufj+sqig3UrDTgBV\n' +
    'AkunPKHWSndR8fTzajF29QNXXJMQYrDmbSu3GR5Tk64uBrIuHo8vHFeCxFr5rlJQ\n' +
    'DwIDAQAB\n' +
    '-----END PUBLIC KEY-----';



const privateKey = '-----BEGIN PRIVATE KEY-----\n' +
    'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtSpvQWJoi/+wS\n' +
    'dOjUnzOsADacEm3ehGojzeQlytnuHBVjLSYj5Ab7DEWYxRqHx1nWwgHoblH7rMbi\n' +
    '8mlfJgWnDaVZxYApnO7q4q5vwrEUcxusIvKgfmzFmUTP5hOFkrq7TgQccuerurlQ\n' +
    'pubIv8fLTwiUnO5NR8R/xdSshdJG5vqEJRghCdvErYSJjACkXB3R0CzHN6ARx2cD\n' +
    'uyDbTrrnRWmEvZu1GonnuDbNy1rptA2Oj4boxSu9dsa29vezUXq3KfG5+P6yqKDd\n' +
    'SsNOAFUCS6c8odZKd1Hx9PNqMXb1A1dckxBisOZtK7cZHlOTri4Gsi4ejy8cV4LE\n' +
    'WvmuUlAPAgMBAAECggEAKZMLvLl1CU6S6X6o2VH0iKBoeZsmRstH150uzi5TiH+u\n' +
    'VePgEZ5EWniAPf2Ttt2J3S8gXA4TlyjFcm8r/orVslVgxR/P9qvS2gFWTjPMXhab\n' +
    'nfmocf7Cw8lYq/QL3PDt4b/+1oBuulGK4iGYnrL8EPe+HEFmHp5IM0tYEaftYdrl\n' +
    'MHeFix7JTUZmiIubS50hdfnMdsNFkKoUjRJADlrFmcLP3+XFAY0fa8VZ3gQryIUN\n' +
    'mKB10pQDdUPqrFeIgkADG2aHLi9eahtX4nNUutNAskk52LRbeCEUVtu2CfpALXA5\n' +
    '3w6cp4D+RVNAb6EuZZu7AO5V1qvoByODSd0araHlwQKBgQDdd0GuazTdb6s5pYH0\n' +
    '6OJkv8DWyf9rtyqy6UZawE0RK47c+85mZNtTsQlmyXOuBT9Z/R+fbjNgcHY/J7ad\n' +
    'JRvXeCs3Cr+zuJ3EV2jaGnmZ3dRxXX4TA2ctjWJc7Md1bgotwTgb/bmATD4bkbOI\n' +
    'DRyUbM0jGxTkCcCYOQlBQ2CkYQKBgQDIUER4E6SQdgA6VT6wD88FwaffqNnk/0Kg\n' +
    '7+YHTfi5mXMEhVNcE00/SMrCFwiQodEZZnO5H6d2+O7ALwnUAW2LOTy4nxAwCevU\n' +
    'CyE+mOGbpP7/yMwyLozFtvlxMXRTfssQQFkWQkJZHT1s2cseQd+Ytg6MngNgE1Rl\n' +
    '0xErkUdKbwKBgHbOwWemj6ezfnHgfkU6oilWTUds+h95FekBCAMrYqyxZ2TZmTKJ\n' +
    'LLhLIzYHII3cts254zsOTXWRH35l+at3+uWuy9AtbgYmJkzsb42B4nZO8OcYNshQ\n' +
    'bQuc64XaaG5w5/j/zPAHP3q6bB8yHNQB5LEjZTFOF/j12mJPRs3CLZhBAoGBAK/F\n' +
    '348OjYVGRoTpcIzGEn+Wo1ybqjhL1Yere0pFnVAf2tHIvJE7TrmNgn42AAoKNJX5\n' +
    'VOrJYAYCAl8Z56Hlbt6QZzwKOAYvboUvDwkC1lXhvvFsneIa/uQv30r4fn8V79Je\n' +
    '5M2nbtkL027E3nu6ih5TAwlZTtTroU+ImrSEUu55AoGAb9/WeQV2C5JiA93WIcFg\n' +
    'JtFDO1cYNFpYvVqpAuRnfBes2VBxCxVfP5CdroNzYdj5qroyMsZDoCGsiMwkIp2i\n' +
    'CRwSBh8kNj7sut8Gd9Xw3oe5o9VTrZRbQeKfDZBlVwLXjjwF2AaHZi7ChllmwNUV\n' +
    'Q+xK7RaJrgbd9uIqQR6Ehoo=\n' +
    '-----END PRIVATE KEY-----'

/*function encrypt(s, keyFileName_public){
    var encs =crypto.publicEncrypt(readKeyFromPEMFile(keyFileName_public), Buffer.from(s));
    var encs = encs.toString("base64");
    return encs;
}*/

function encrypt(s){
    var encs = crypto.publicEncrypt({
        key:publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    }, Buffer.from(s));
    var encs = encs.toString("base64");
    return encs;
}

/*function decrypt(es, keyFileName_private){
    var options = { key: readKeyFromPEMFile(keyFileName_private)};
    var dcs = crypto.privateDecrypt(options, Buffer.from(es, "base64"));
    var dcs = dcs.toString("utf8");
    return dcs;
}*/


function decrypt(es){
    //var options = { key: readKeyFromPEMFile(keyFileName_private)};

    var options = {     key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256" };

    var dcs = crypto.privateDecrypt(options, Buffer.from(es, "base64"));
    var dcs = dcs.toString("utf8");
    return dcs;
}

function readKeyFromPEMFile(fn){
    var s = fs.readFileSync(fn, 'utf8');
    return s;
}

module.exports = { encrypt, decrypt };