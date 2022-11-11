import { JSEncrypt } from "jsencrypt";
import { privateKey } from "../config/RSA";
// rsa解密--密码
const rsaDecryption = async (data:string) => {
    let decryption = new JSEncrypt(); // 初始化
    await decryption.setPrivateKey(privateKey); // 设置 解密私钥   
    return decryption.encrypt(data)
};


//效验密码是否通过rsa加密
const validationPassword = (password:string)=> {
    rsaDecryption(password)
}

export { rsaDecryption, validationPassword }