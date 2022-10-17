import User from '../../models/User.model';
import jwt from 'jsonwebtoken';
import util from 'util';
import promisify = util.promisify;
import { generate } from 'rand-token';

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

export async function updateRefreshToken(username: string, refreshToken: string) {
    try {
        await User.findOneAndUpdate({ username: username }, { refreshToken: refreshToken })
        return true;
    } catch (error) {
        return false;
    }
}

export async function generateToken(payload: any, secretSignature: any, tokenLife: string) {
    try {
        return await sign({ payload }, secretSignature, {
            algorithm: 'HS256',
            expiresIn: tokenLife,
        })
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
}
// export async function verifyToken(token: string, secretKey: string) {
//     try {
//         return await verify(token, secretKey);
//     } catch (error) {
//         console.log(`Error in verify access token:  + ${error}`);
//         return null;
//     }
// }

// export async function decodeToken(token: string, secretKey: string) {
//     try {
//         return await verify(token, secretKey, {
//             ignoreExpiration: true,
//         });
//     } catch (error) {
//         console.log(`Error in decode access token: ${error}`);
//         return null;
//     }
// }