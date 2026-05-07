import * as crypto from 'crypto';
import { envs } from 'src/config';

const ALGORITHM = 'aes-256-ctr';
const SECRET_KEY = Buffer.from(envs.sshSecretKey, 'hex'); 
const IV_LENGTH = 16;

export function encrypt(text: string): string {
  if (!text) return '';
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(hash: string): string {
  if (!hash) return '';
  const [ivHex, encryptedHex] = hash.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted.toString('utf8');
}
