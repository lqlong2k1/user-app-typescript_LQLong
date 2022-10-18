import User from '../models/User.model';
import { IUser } from '../interface/user.interface';
import userConst from '../const/user.const';
import * as errMessage from '../const/err-messages.const';
import * as successMessage from '../const/success-messages.const';
import bcrypt from 'bcrypt';
import role from '../data/user.role.data';
import * as jwtVariable from '../authentication/variables/jwt.variables';
import *as methodAuthentication from '../authentication/methods/methods.authentication';
import randToken from 'rand-token';


async function hashPassword(password: string) {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(userConst.SALT_VALUE);
    // now we set user password to hashed password
    password = await bcrypt.hash(password, salt);
    return password;
}

export async function createUser(data: IUser) {
    const user = new User(data);
    user.password = await hashPassword(user.password);
    user.save();
    return user;
}

export async function getAllUsers() {
    return await User.find({}).select('username name dob address phoneNumber refreshToken')
}

export async function getUserById(idUser: string) {
    const user = await User.findById(idUser).select('username name dob address phoneNumber refreshToken')
    if (user === null) return errMessage.NOT_FOUND_USER;
    return user;
}

export async function updateUserById(idUser: string, data: IUser) {
    const user = await User.findByIdAndUpdate(idUser, data);
    return user;
}

// export async function removeUserbyId(idUserInSession: string, idUser: string) {
//     const userInSession = await User.findOne({ _id: idUserInSession, roles: role.ROLE.ADMIN });
//     if (userInSession) {
//         const user = await User.findOne({ _id: idUser, roles: role.ROLE.ADMIN });
//         if (user) {
//             await User.deleteOne({ _id: idUser });
//             return successMessage.REMOVED_USER_SUCCESS;
//         } else return errMessage.CAN_NOT_REMOVE;
//     } else return errMessage.CAN_NOT_REMOVE;
// }

export async function removeUserbyId(idUser: string) {
    const user = await User.deleteOne({ _id: idUser });
    if (user) {
        return successMessage.REMOVED_USER_SUCCESS;
    } else {
        return errMessage.CAN_NOT_REMOVE;
    }
}

export async function login(username: string, password: string) {
    const user = await User.findOne({ username: username });
    if (!user) {
        return errMessage.LOGIN_FAIL_USERNAME;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return errMessage.LOGIN_FAIL_PASSWORD;
    }

    const accessTokenLife =
        process.env.ACCESS_TOKEN_LIFE || jwtVariable.ACCESS_TOKEN_LIFE;
    const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || jwtVariable.ACCESS_TOKEN_SECRET;

    const dataForAccessToken = {
        username: user.username,
    };
    const accessToken = await methodAuthentication.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife,
    );
    if (!accessToken) {
        return errMessage.LOGIN_FAIL_ACCESS_TOKEN;
    }

    //create a refresh token ngẫu nhiên
    let refresh_token = randToken.generate(jwtVariable.REFRESH_TOKEN_SIZE)
    if (!user.refreshToken) {
        //If user haven't refresh token yet -> save this refresh token into database
        await methodAuthentication.updateRefreshToken(user.username, refresh_token);
    } else {
        refresh_token = user.refreshToken;
    }

    if (user.roles === role.ROLE.ADMIN) {
        return successMessage.LOGIN_SUCCESS_ADMIN;
    } else {
        return successMessage.LOGIN_SUCCESS_USER;
    }
}



