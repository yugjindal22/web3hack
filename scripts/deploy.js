const { ethers } = require("hardhat");
const crypto = require('crypto');
const fs = require("fs");

// require("dotenv").config();

async function deployPublicRecordContract(data) {
  const PublicRecordFactory = await ethers.getContractFactory("PublicRecord");
  console.log("Deploying Contract...");

  const chunkSize = 128;
  const chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.subarray(i, i + chunkSize));
  }


  let firstPublicRecord, lastPublicRecord;
  await chunks.map(async (chunk, index) => {
    if (index == 0) {
      firstPublicRecord = await PublicRecordFactory.deploy("MyPDF File", chunk);

      const txHash = publicRecord.deployTransaction.hash;
      const txReceipt = await ethers.provider.waitForTransaction(txHash);

      console.log(`Contract #${index} deployed at address: ${txReceipt.contractAddress}`);
      lastPublicRecord = firstPublicRecord;
    }

    const _publicRecord = await PublicRecordFactory.deploy("MyPDF File", chunk);

    const txHash = publicRecord.deployTransaction.hash;
    const txReceipt = await ethers.provider.waitForTransaction(txHash);

    console.log(`Contract #${index} deployed at address: ${txReceipt.contractAddress}`);

    const tx = await lastPublicRecord.update(txReceipt.contractAddress);
    await tx.wait();

    lastPublicRecord = _publicRecord;
  })


  const publicRecord = await PublicRecordFactory.deploy("MyPDF File", data);

  const txHash = publicRecord.deployTransaction.hash;
  const txReceipt = await ethers.provider.waitForTransaction(txHash);

  console.log(`Contract deployed at address: ${txReceipt.contractAddress}`);
}


async function deployPublicRecordHash(hash) {
  const PublicRecordFactory = await ethers.getContractFactory("PublicRecord");
  console.log("Deploying Contract...");
}

// Get keys
const publicKeyPath = "keys/public-key.pem";
// const privateKeyPath = 'keys/private-key.pem';

const publicKey = fs.readFileSync(publicKeyPath, 'utf-8');
// const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');

// File
const filePath = "data/Test.pdf";
// const encryptedfilePath = "data/encryptedHello.pdf";
// const decryptedfilePath = "data/decryptedHello.pdf";

function encrypt(dataToEncrypt) {
  // Encrypt
  // const dataToEncrypt = fs.readFileSync(filePath);
  const chunkSize = 64;

  const chunks = [];
  for (let i = 0; i < dataToEncrypt.length; i += chunkSize) {
    chunks.push(dataToEncrypt.subarray(i, i + chunkSize));
  }

  const encryptedChunks = chunks.map(chunk => {
    return crypto.publicEncrypt({
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    }, Buffer.from(chunk));
  });

  const encryptedData = Buffer.concat(encryptedChunks);
  // fs.writeFileSync(encryptedfilePath, encryptedData);
  return encryptedData;
}

async function main() {
  console.log("Name of the file: ", filePath);
  const dataBuffer = fs.readFileSync(filePath);

  const encrypted = encrypt(dataBuffer);
  await deployPublicRecordContract(encrypted);
}

// Main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("Completed");
    process.exitCode = 0;
  });

