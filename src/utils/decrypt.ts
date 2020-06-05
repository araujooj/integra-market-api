import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const password = '18f60f100223acb6299ca5530f9b405c';

export default function decrypt(text: string): string {
    const decipher = crypto.createDecipher(algorithm, password)
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}
