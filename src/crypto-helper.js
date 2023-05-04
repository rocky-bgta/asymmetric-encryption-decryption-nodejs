const crypto = require('crypto');
const fs = require('fs');

// Crypto helper - encryption and deccryption of string using PEM public or private keys from files.
// Works with keys created using openssl:
/*
Without passphrase:
openssl genrsa -out pvkey.pem 4096
openssl rsa -in pvkey.pem -outform PEM -pubout -out pbkey.pem
*/


 const publicKey= readKeyFromPEMFile('../keys/public_key.pem');
 const privateKey = readKeyFromPEMFile('../keys/private_key.pem');



function encrypt(s){
    var encs = crypto.publicEncrypt({
        key:publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    }, Buffer.from(s));
    var encs = encs.toString("base64");
    return encs;
}


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