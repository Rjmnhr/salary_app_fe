import CryptoJS from "crypto-js";

// Replace this with your secret key (keep it safe)
const secretKey = "equipaypartners";

// Encrypt data
function encryptData(data) {
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encryptedData;
}

// Decrypt data
function decryptData(encryptedData) {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return decryptedData;
}

// Encrypt both key and data
export function encryptAndStoreDataLocal(key, data) {
  const combinedData = JSON.stringify({ key, data });
  const encryptedData = encryptData(combinedData);
  localStorage.setItem(key, encryptedData);
}

// Retrieve and decrypt data
export function retrieveAndDecryptDataLocal(key) {
  const encryptedData = localStorage.getItem(key);
  console.log(
    "🚀 ~ file: index.js:30 ~ retrieveAndDecryptDataLocal ~ encryptedData:",
    encryptedData
  );
  if (encryptedData) {
    const combinedData = decryptData(encryptedData);
    const { key: decryptedKey, data } = JSON.parse(combinedData);
    return { key: decryptedKey, data };
  }
  return null;
}

// Encrypt both key and data
export function encryptAndStoreDataSession(key, data) {
  const combinedData = JSON.stringify({ key, data });
  const encryptedData = encryptData(combinedData);
  sessionStorage.setItem(key, encryptedData);
}

// Retrieve and decrypt data
export function retrieveAndDecryptDataSession(key) {
  const encryptedData = sessionStorage.getItem(key);
  console.log(
    "🚀 ~ file: index.js:52 ~ retrieveAndDecryptDataSession ~ encryptedData:",
    encryptedData
  );
  if (encryptedData) {
    const combinedData = decryptData(encryptedData);
    const { key: decryptedKey, data } = JSON.parse(combinedData);
    return { key: decryptedKey, data };
  }
  return null;
}
