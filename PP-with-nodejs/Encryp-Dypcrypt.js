var ch = require('./crypto-helper');

var s = "The quick brown fox jumps over the lazy dog";
//console.log(s);

/*var encrypted = ch.encrypt(s, "../pbkey.pem");
console.log(encrypted);*/

var encrypted = ch.encrypt(s);
console.log(encrypted);



/*var decrypted = ch.decrypt(encrypted, "../pvkey.pem");
console.log(decrypted);*/

const javaEncrypted = 'hJw6in18LcMsXy3lBjn4xzk91oz5QNAQVRcM/x/iY50hUon0JD21fxWoltDL0CqwHGlNWJSiw3++zGvNT/h3XTciDsGIm6wmdajZEswjwJjij8AenP8bGybrZAESjBOh9Z88WzWGC2OeQc9UCU/KCIPuAs3n2gbalUT6zB3JLi5nXIRuF7n5bAiF227pENYVO5uGBXqLpOP9s3tRrDHFalEjAW9DZVJAQSyhken85ISyp803Pu2evSe1QSLpPNPufT0ju9A3+N8UP/5ta3l1XohpZWwn9refngSlPTocHa4zU2WLfHCD2CRwJuB+70Ho2W3u7Jl7sbj4U7625rPiVg==';

var decrypted = ch.decrypt(javaEncrypted);
//console.log(decrypted);