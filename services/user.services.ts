import User from '../models/User.model';
import { IUser } from '../interface/user.interface';
import userConst from '../const/user.const';
import * as errMessage from '../const/err-messages.const';
import * as successMessage from '../const/success-messages.const';
import bcrypt from 'bcrypt';
import role from '../data/user.role.data';

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
    return await User.find({}).select('username name dob address phonenumber')
}

export async function getUserById(idUser: string) {
    const user = await User.findById(idUser).select('username name dob address phonenumber')
    if (user === null) return errMessage.NOT_FOUND_USER;
    return user;
}

export async function updateUserById(idUser: string, data: IUser) {
    const user = await User.findByIdAndUpdate(idUser, data);
    return user;
}

export async function forceRemoveUserById(idUser: string) {
    const user = await User.deleteOne({ _id: idUser });
    return user;
}

export async function removeUserbyId(idUserInSession: string, idUser: string) {
    const userInSession = await User.findOne({ _id: idUserInSession, roles: role.ROLE.ADMIN });
    if (userInSession) {
        const user = await User.findOne({ _id: idUser, roles: role.ROLE.ADMIN });
        if (user) {
            await User.deleteOne({ _id: idUser });
            return successMessage.REMOVED_USER_SUCCESS;
        } else return errMessage.CAN_NOT_REMOVE;
    } else return errMessage.CAN_NOT_REMOVE;

}




export async function login(username: string, password: string) {
    const user = await User.findOne({ username: username });
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            if (user.roles === role.ROLE.ADMIN) return successMessage.LOGIN_SUCCESS_ADMIN;
            return successMessage.LOGIN_SUCCESS_USER;
        } else return errMessage.LOGIN_FAIL_PASSWORD;
    } else return errMessage.LOGIN_FAIL_USERNAME;
}


