var ch = require('./crypto-helper');

var s = "The quick brown fox jumps over the lazy dog";
//console.log(s);

var encrypted = ch.encrypt(s);
console.log(encrypted);

// var encrypted = ch.encrypt(s);
// console.log(encrypted);



/*var decrypted = ch.decrypt(encrypted);
console.log(decrypted);*/


const javaEncrypted = 'cIIQCB0GnCDmySuRSK15RGEP/ziZWQE1j+rvyQZbFxxFR1MciLkTAa1+68KC4g1l0cX11GfdOdv5ID2DBZvroVmzKWvdaT+NUUQDzyrTmMOwMW90jWkqDz1zVveShzg8ARPyfUU4fSgqjzmAK/1pNHe+XaepI8lY5BlSUzmFuxQ+Yybggz/CBy0pbIcuHBvyHV55zMCrq8YXt/4QAEeRLVxhJUsJY5JQoMjTuGoJXezvdF2qjsykqUOKuDwJY3LbZ8BwKyAIijGDhqDzCKF1gB8fRr9A1KmpXli4g5UhUIzxDmET9kpW1KHtpfq4LKIErnulIeHXTi3RV+i7A3HbNg=='
var decrypted = ch.decrypt(javaEncrypted);
console.log(decrypted);
