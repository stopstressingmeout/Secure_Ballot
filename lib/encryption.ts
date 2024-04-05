import {createHash, generateKeyPairSync, privateDecrypt, publicEncrypt, randomBytes} from 'crypto'
import { AES, enc } from 'crypto-js';

const {publicKey, privateKey} = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
})

export const AsymmetricEncrypt = (data: string) => {
    const encryptedData = publicEncrypt(publicKey, Buffer.from(data)).toString('base64');
    return encryptedData;
}

export const AsymmetricDecrypt = (data: string) => {
    const decryptedData = privateDecrypt(privateKey, Buffer.from(data, 'base64')).toString();
    return decryptedData;
}

export const encrypt = (data: string) => {
    const secret = randomBytes(32).toString("base64");
    const encryptedData = AES.encrypt(data, secret).toString();
    return {
        encryptedData,
        secret
    };   
}

export const decrypt = (data: string, secret: string) => {
    const decryptedData = AES.decrypt(data, secret).toString(enc.Utf8);
    return decryptedData;
}

export const hashedKey = (data:string, salt:string) => {
    return createHash('sha256').update(data + salt).digest('base64');
}