import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const password = '18f60f100223acb6299ca5530f9b405c';

export default function encrypt(text: string): string {
    const cipher = crypto.createCipher(algorithm, password)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}