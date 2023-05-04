var ch = require('./crypto-helper');

var s = "The quick brown fox jumps over the lazy dog";
//console.log(s);

var encrypted = ch.encrypt(s);
console.log(encrypted);

// var encrypted = ch.encrypt(s);
// console.log(encrypted);



var decrypted = ch.decrypt(encrypted);
console.log(decrypted);

/*
const javaEncrypted = 'TumuCLoDRztjLS7TvKTBZTnQzkK0P437d2oXJnAvj5JBZy7XVoWENGsngdIF6xp1VezgfcOtIhd2jhnTEzxZjxGcM7vDXlcnLgfn60qFXy0JHhUCoUEM1Ubp5L1g/JthBrp+Z1SgB0JctXoBZNoNRu4GRau09jISKPhulVAheB4GDTvP5+EWO+ZLZlD7X3LyoLcO6piUDf+yiFDoJ0yYrifwv/t/8EMHIdskPSyfOWDe/KyfucaD/M0mnsSLrzcwSoFwwZfNq+h8ksuPeDz1V3Bf3XEFWAu9Biz+AvO+vNT21rboH3Y7DZbp8pjouHQ/WWcxyfJAbBEoWql1Zekejw==';

var decrypted = ch.decrypt(javaEncrypted);
console.log(decrypted);*/
