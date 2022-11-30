import * as CryptoJS from 'crypto-js'


export const encryptName = (str) => {
  // return CryptoJS.DES.encrypt(str, "qwertyzbc").toString();
  return encodeURIComponent(CryptoJS.AES.encrypt(str.toString(), "qwertyzbc").toString());
};

export const decryptName = (str) => {
  // return CryptoJS.DES.decrypt(str, "qwertyzbc");
  // return decodeURIComponent(CryptoJS.DES.decrypt(str.toString(), config.CRYPTO_PASSPHRASE_RES).toString());
  return decodeURIComponent(CryptoJS.AES.decrypt(str.toString(), "qwertyzbc").toString());
}

