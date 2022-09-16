import envResolver from "./envResolver.util";
import crypto from "crypto";

envResolver();

const ENCRYPION_ALGORITHM = process.env.ENCRYPION_ALGORITHM as string;
const SECURITY_KEY = process.env.SECURITY_KEY as string;
const CRYPT_VECTOR = process.env.CRYPT_VECTOR as string;

const key = Buffer.concat([Buffer.from(SECURITY_KEY)], 32);
const iv = Buffer.concat([Buffer.from(CRYPT_VECTOR)], 16);

export const encrypt = (data: string): string => {
    const cipher = crypto.createCipheriv(ENCRYPION_ALGORITHM, key, iv);
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
};

export const decrypt = (encryptedData: string): string => {
    const cipher = crypto.createDecipheriv(ENCRYPION_ALGORITHM, key, iv);
    return cipher.update(encryptedData, "hex", "utf-8");
};
