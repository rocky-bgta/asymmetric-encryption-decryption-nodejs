var ch = require('./crypto-helper');

var s = "The quick brown fox jumps over the lazy dog";
console.log(s);

/*var encrypted = ch.encrypt(s, "../pbkey.pem");
console.log(encrypted);*/

var encrypted = ch.encrypt(s);
console.log(encrypted);



/*var decrypted = ch.decrypt(encrypted, "../pvkey.pem");
console.log(decrypted);*/



var decrypted = ch.decrypt(encrypted);
console.log(decrypted);