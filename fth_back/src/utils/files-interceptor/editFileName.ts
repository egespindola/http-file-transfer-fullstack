// import * as CryptoJS from 'crypto-js'
import * as HASH from './hashName'

export const editFileName = (req, file, callback) => {
  // const name = file.originalname.split('.')[0];
  console.log(file.originalname)
  console.log("hashedname ↓")
  let customFileName = HASH.encryptName(file.originalname).replace(/\//g,'s1L2a3S4h')
  console.log(customFileName)
  // let hashName = CryptoJS.DES.encrypt(file.originalname, "qwertyzbc").toString();
  // let originalName = CryptoJS.DES.decrypt(hashName, "qwertyzbc");
  // console.log('<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>')
  // const fileExtName = file.originalname;

  // const ext = file.originalname.split('.')[1];
  // const name = file.filename
  // const customName = `${name}.${ext}`
  const fileExtName = file.originalname;
  // const randomName = Array(4)
  //   .fill(null)
  //   .map(() => Math.round(Math.random() * 16).toString(16))
  //   .join('');
  // callback(null, `${name}-${randomName}${fileExtName}`);
  // callback(null, `${fileExtName}`);
  callback(null, `${customFileName}`);
};