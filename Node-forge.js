const crypto = require('crypto');

// The encrypted message and private key
const encryptedMessage = 'sHTiiZxMuLypv6XudaZRSM7snA4aKEBI92YCIGzdkZw5LU5E9ZvVQpmYYA/9BpTIOAQHSBLvNYHXtVA70Wr9FGkXplYcqbfA/W0WAT+mWrW5s07S4MFBTdZBemaGBU+pjjlJlhEYuJk2nr5j4HmQJbYZhNmB4oULm7+ejAd7cmMnm4lMiw7fGpDbTt9z0EaQ6wTytyYwkT2GeGpAVKuhtXncoG8xzs2SMoPN1/ncuCOpXt8k88NiZib4JpF0H3R6BTwdXB3FuBO6M4zs+9rk8RXM1RLG089R6YxvTCvDE2VnSx2FSsoz3vQU2FAWqrq5DDgZu8A6FEONCwY6O/ixSg=='; // Replace with the actual encrypted message
const privateKey = '-----BEGIN PRIVATE KEY-----\n' +
    'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDNXPCVfM4q5ELDL+naGwK69RnZDzaMWAjAGhV+orLUkyyS03Ha/vZzHQMe6clMmCGGWOgBA9NYE1fmoWhW2TqH3fID4089tbFgA0n+Rrh4NcRTN03BkFh3soX83WU2Txnpa+TYCVHfQBk3gL9lwIbEMVa96a2b6+egQ/6eUibnd5LKkKsydoNMRQAEKMl/Ul551bgqV2Y9YKNxY39HgitrUQLuzzbpjeQjA7+YBBL+3p3APE8dl759eXNY0f8pXSBHjvLNAxvgoFKn5aZL9WdNA8nQdFZd35mbXTyhwCGDygOQuDpc+0FSGOG9d5NxrrxADfe9M82EH6KZQG7Eup/JAgMBAAECggEBALuJTAq3Vm7E1FL6xkturyeb/GbEBcRUAGmtaEOkwDpvzBypCyg5/UVSES+Bv1o68yKEvhlvLOkZgQQUEfx9k33PqNr0EcEA02IinseePYdJUmfL8S36a0+jr8gjRfI6eic3aFwA5stA9cZBxIdfMbKoe9YiN3BUFcm9Th+2VeC5JQJ2C3FIjObXF7NibSxsaswmHTE73mkTDFhBu4OEj4MzlF4bzYRYy5akUxLeS9wA6YH4y6+wNO4Wp+wvM+E20VidZUT1hDP0FsvaK0JPaEDF4sM+GwQEnShU0UFrUS7rxlxaC0iwmM96Oi5Av61JBUfhAf8idofCxQotmkI9i6ECgYEA+Z2zYxtwTQ5S9O1o2h14FP46AQKcLZWDBAZ4Ghh1GERj+4bluz//3atwAjVjRmIz8MZvXtMTV9IzWp/fOuiNen7AqQg92cz6Gegrpo8Gi8Brp+tT++/q2+9PMFQHz6J0kZG4ocUJkdejlXLy+R5rhCBsjkIc2ycACHXnMNTlVY8CgYEA0p2A7kPnYyzryYwDPlUvOXcn3/uDt8vTINLanH6/ywRrO/XspmcJzKM+AuO8Anbmz5gXr2hoqb9hPdbKupnxV+bswMabQ+JWRZ2satyb//4k7sP2pX/JRsVEPuwsYg6EaCPiyMw/+XYzsO4cg64UXG1Z/KBWDvZSKKSwYaEGeScCgYEA+UnYvLLLffk/OiLb43Eo2vZmoVmk9hVqShvX2F/ymXC71ZiMWGx7MTuk2l/NLJ6ott7GnRH6MGvaI7ikbSWRHfP2nxl/A8SlRjhLV8VhSTK7kXEBaAvcJxghoudZAbGB71tz5ANvIjsUwQ2SwN7zi3oCUDSQswGJE+oEIQ2Nl9sCgYBaZqSKoLbWyNdEIUbbIHEut0h0SV7WKzSqKBcRiQ4FtBXbHMnA+wUnwwHA98MhQ6v6ewvfjG8wPSceBe3qfl0rH8GLVTQbxTDGnND+5UZIcOulWJOrodfg+pc6cuDyDc0jbhPPoGvtRaEWVn4Cv1uZ+I3hc2i871mAfIAAx78hjQKBgQDmaDiImpzkpgAGO8y8WldOYUDZoxWuWy99kTXy/V3ERfTf7xlZGk0cpThiGUEixyMZX2qLxgJbq7Nj/0JcniZnJHN/FuIUEibOy3G5Sv31zUEZFE+69nr3iY/IJ5OH61eh0l0cBP0YIPsEWEKb+FeM2dTOiVRA3mHkUZw9fA/vCg==\n' +
    '-----END PRIVATE KEY-----'; // Replace with the actual private key

// Convert the private key from PEM format to a Node.js Buffer
const bufferPrivateKey = Buffer.from(privateKey, 'utf-8');

// Create a decipher object with the private key
const decipher = crypto.createDecipheriv('aes-256-cbc', bufferPrivateKey, Buffer.alloc(16));

// Decrypt the message
let decrypted = decipher.update(encryptedMessage, 'base64', 'utf-8');
decrypted += decipher.final('utf-8');

console.log(decrypted)