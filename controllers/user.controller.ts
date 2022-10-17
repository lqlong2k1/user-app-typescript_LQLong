import { Request, Response, NextFunction } from 'express';
import * as userServices from '../services/user.services';
import User from '../models/User.model';

const allUsers = async (req: Request, res: Response) => {
    try {
        const user = await userServices.getAllUsers();
        return res.json({
            method: 'GET',
            status: 'success',
            description: 'list all users',
            data: user
        });
    } catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userServices.createUser(req.body);
        return res.json({
            method: 'POST',
            status: 'success',
            description: 'Create a new user',
            data: user
        });
    } catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        console.log(req.params.id);
        const user = await userServices.getUserById(req.params.id);
        return res.json({
            method: 'GET',
            status: 'success',
            description: 'Get user by ID',
            data: user
        });

    } catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
}

const updateUserById = async (req: Request, res: Response) => {
    try {
        const user = await userServices.updateUserById(req.params.id, req.body);
        return res.json({
            method: 'PUT',
            status: 'success',
            description: 'Update user by ID',
            data: user
        });
    } catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
}

const deleteUserById = async (req: Request, res: Response) => {
    try {
        const user = await userServices.forceRemoveUserById(req.params.id);
        return res.json({
            method: 'DELETE',
            status: 'success',
            description: 'Remove user by ID',
            data: user
        });
    } catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
}
const login = async (req: Request, res: Response) => {
    try {
        const message = await userServices.login(req.body.username, req.body.password)
        return res.json({
            method: 'POST',
            description: 'Login user',
            data: message
        });
    } catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
}

const removeUserbyId = async (req: Request, res: Response) => {
    try {
        const message = await userServices.removeUserbyId('633fed90bb83e055246464d3',req.params.id);
        return res.json({
            method: 'DELETE',
            status: 'success',
            description: 'Remove user by ID',
            data: message
        });
    } catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
}
// export async function setUser(req: Request, res: Response, next: NextFunction) {
//     const userId = req.body._id;
//     if (userId) {
//       req. = User.find({_id :userId})
//     }
//     next()
//   }
export default {
    allUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    login,
    removeUserbyId
}
