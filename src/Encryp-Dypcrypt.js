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
const javaEncrypted = 'QHdt/CvNQOw/M0KUUCcZaDEFnZ7LkKTYhktUv+pXUYPOh14q4UYsD5Odz02C/p8bx8RiTfvXMQQ3xDqMiZoWgo1GMRxEqSjJxxCnZYba3E5Nt7ij3TFODIP6/V5hkRMRivLGz93YykT81B1jNtm3lBkwis6peJfLQZ5ISrmPLAFzYCYSB6Q3NiK76UnEO0dd2WueiylGnaD1EaUyZQ1sb5VPcFEw28fg6q8oridBB9ibBU8rt+tcJGlzNMtwprwPzGvpGCq7uo+EOc7dBpqdZ/UPJMlkMXiorZ2Sms6mkprYBEPOl3VKPA3DgbO7QX504a0RKAyUXJomw06ewjbxAw==';

var decrypted = ch.decrypt(javaEncrypted);
console.log(decrypted);*/
