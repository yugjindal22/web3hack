const { ethers } = require("hardhat");
const crypto = require('crypto');
const fs = require("fs");

const privateKeyPath = 'keys/private-key.pem';
const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');

function decrypt(dataToDecrypt) {
    // Decrypt
    // const dataToDecrypt = fs.readFileSync(encryptedfilePath);
    const chunkSize = 256;

    const chunks = [];
    for (let i = 0; i < dataToDecrypt.length; i += chunkSize) {
        chunks.push(dataToDecrypt.subarray(i, i + chunkSize));
    }

    const decryptedChunks = chunks.map(chunk => {
        return crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        }, Buffer.from(chunk));
    });

    const decryptedData = Buffer.concat(decryptedChunks);
    // fs.writeFileSync(decryptedfilePath, decryptedData);
    return decryptedData;
}


