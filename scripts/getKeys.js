const fs = require('fs');
const crypto = require('crypto');

// Generate a new RSA key pair
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    },
});

// Save the private key to a file
fs.writeFileSync('private-key.pem', privateKey);

// Save the public key to a file
fs.writeFileSync('public-key.pem', publicKey);

console.log('Private and Public Keys saved to private-key.pem and public-key.pem');
