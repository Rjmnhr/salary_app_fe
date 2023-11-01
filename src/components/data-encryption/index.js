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
  const encryptedData = encryptData(data);
  localStorage.setItem(key, encryptedData);
}

// Retrieve and decrypt data
export function retrieveAndDecryptDataLocal(key) {
  const encryptedData = localStorage.getItem(key);
  if (encryptedData) {
    const data = decryptData(encryptedData);

    return { key, data };
  }
  return null;
}

// Encrypt both key and data
export function encryptAndStoreDataSession(key, data) {
  const encryptedData = encryptData(data);
  sessionStorage.setItem(key, encryptedData);
}

// Retrieve and decrypt data
export function retrieveAndDecryptDataSession(key) {
  const encryptedData = sessionStorage.getItem(key);
  if (encryptedData) {
    const data = decryptData(encryptedData);

    return { key, data };
  }
  return null;
}
