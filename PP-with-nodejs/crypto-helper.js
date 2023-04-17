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
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1IkMkTduzACmgj6b8cvR\n' +
    'VXQ0Mun1/e1jxEmWy4Th7s/Hul5JXr9r4JCS6COWWsLnAd2QyPYu06YuSz6jgg2c\n' +
    'yM+aor8BnMMQJfGVx1A8uqkAOin0BmHu7jagmS4Lp+z+NozyQRaD5rI9BcQbIrZt\n' +
    'jkKADen+OWNYhuYatevoqPHeuLklNr7vcf87pZMCnc5LIsUh4gb8jP+S2kirEV8x\n' +
    'HVsQpLQ8D4vbGJIThOP/elIzI5W3lMMSwcrOJa7KQjAGE2yqCy9dIHdK4y0R41mF\n' +
    'hjoP3dJ1yW1LkVYtsuUpP825glQguG46xC6bQvRkuJ3h1Kr/wyUpvvpEGdE9qVqt\n' +
    'hwIDAQAB\n' +
    '-----END PUBLIC KEY-----';



const privateKey = '-----BEGIN PRIVATE KEY-----\n' +
    'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDUiQyRN27MAKaC\n' +
    'Ppvxy9FVdDQy6fX97WPESZbLhOHuz8e6Xklev2vgkJLoI5ZawucB3ZDI9i7Tpi5L\n' +
    'PqOCDZzIz5qivwGcwxAl8ZXHUDy6qQA6KfQGYe7uNqCZLgun7P42jPJBFoPmsj0F\n' +
    'xBsitm2OQoAN6f45Y1iG5hq16+io8d64uSU2vu9x/zulkwKdzksixSHiBvyM/5La\n' +
    'SKsRXzEdWxCktDwPi9sYkhOE4/96UjMjlbeUwxLBys4lrspCMAYTbKoLL10gd0rj\n' +
    'LRHjWYWGOg/d0nXJbUuRVi2y5Sk/zbmCVCC4bjrELptC9GS4neHUqv/DJSm++kQZ\n' +
    '0T2pWq2HAgMBAAECggEBAKxiTJMsRu2oSWWyqoHAMxYAnqX9JczD0vvORETmjupI\n' +
    'FVOQTipPUIxgNweadcU/+GaG83xMUUbRrxLQx4YgzF4EJQSDsCcZ/+sGu9lhtyAf\n' +
    'G1QR2x+iJ02HeVNFCac2jipov8UTIgDn6J7YpLnPBaUxQvQGKnEZpyAjWt7bbWY4\n' +
    '7WvuyiubBkCzPPwZ6ySEpeqy35rMRoc4a6RLmeMiN7RwQLU3qBefdv3fqXYASJtK\n' +
    'oxiwkkt0aB2oEZhFOJ5CuS0+go2HrBanXZIr8rMDIdkxqs2FM9kdDxJ+PEzkOr+X\n' +
    'gXe1jOC0fxtzKVZHPP1dRtmnIGL/acWheHK9s9VbqeECgYEA6qgGT/GscTXUG+NU\n' +
    'COTqGTc//e3QlXJzTdLREt0x8Rf30qy8XMP/083RJb4996uq/+b8UU9DUD7gIT5a\n' +
    'SOaIH1eOjkNT6186LL3JXwbCzbUUgJ+WnsY8o0diBdqU63lAcLxq64KC2x5cAujQ\n' +
    'oVxfhvnlBUHbTMjJ0QWt479z8H0CgYEA593v0B1h7dovLj+fKh7964hEk1SmILwL\n' +
    'Je78d6xEszUQ/5C2D1fW7w0nVvgNbWhsJPIvDCxijr0rmU96LnehZIwr2/Vs3GOx\n' +
    '9AIXI56C2kdfXvim5yUDbKs2LerXyPCiC7qlbyBz4S3zZeSCuBtymRUnNrHpdkxr\n' +
    'NtHXEot9mVMCgYEAki2d0QtiOxwnSEAzR18jHhY2/P66435qqd5cc/3rcJ9XuJv2\n' +
    's2s94Tnjwjli7Pi6C7RfFl/kNQcWJF9tauCBh9TJb4ItswCdguWvnkzd6buWTBIe\n' +
    'iEZB3A1J2Q+zmYTtSc12ZcPltI6TDxTtcrfSoojlzIKcFJc4ccex7aCEnxkCgYAR\n' +
    'HPNHM/P3XyQeULnJnRH2oU8WZKgCQH6+JP5jQsarR15izmZxiXUmnZzqsVIkYhGh\n' +
    'RHKuflQj3thp71DAPzodNq9CA8IuHfmTXdghW+CihaQHWWjQJI41JgnQp8WXYhND\n' +
    'tFnjcsy6sO6G9a+kMPprTAFh6w2lGozLNf+escbqWwKBgBT/ZrBpNpIKW8Mtib7A\n' +
    'MZPgJZIqEbF6NS3m/fNMLi7Jd5Qb8CPPxtwkw4ttWo8b8y2cmvCy8VocSbZNkpZt\n' +
    'ikxyg/8lUnt+A6rWrKQAWHsSYtFuzIlZE6ywv/osBM249AdRvI0xaDah21T9jK2s\n' +
    '93clqBTtnZUo3W8k246xTGby\n' +
    '-----END PRIVATE KEY-----'

/*function encrypt(s, keyFileName_public){
    crypto.publicEncrypt(readKeyFromPEMFile(keyFileName_public), Buffer.from(s));
    var encs = encs.toString("base64");
    return encs;
}*/

function encrypt(s){
    var encs = crypto.publicEncrypt(publicKey, Buffer.from(s));
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
    var dcs = crypto.privateDecrypt(privateKey, Buffer.from(es, "base64"));
    var dcs = dcs.toString("utf8");
    return dcs;
}

function readKeyFromPEMFile(fn){
    var s = fs.readFileSync(fn, 'utf8');
    return s;
}

module.exports = { encrypt, decrypt };