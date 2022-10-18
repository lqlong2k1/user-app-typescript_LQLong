import express from 'express';
import { validate } from 'express-validation';
import userValidation from '../validation/user.validation';
import userMiddleware from '../middlewares/user.middleware';
import userController from '../controllers/user.controller';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *          -_id
 *          -username
 *          -name
 *          -dob
 *          -address
 *          -phoneNumber
 *          -roles
 *          -refreshToken
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *           required: true
 *         username:
 *           type: string
 *           description: Username to login of the user
 *           required: true
 *         password:
 *           type: string
 *           description: password to login of the user
 *           required: true
 *         name:
 *           type: string
 *           description: The name of user
 *           required: true
 *         dob:
 *           type: Date
 *           description: the birthday of user
 *           required: true
 *         address:
 *           type: string
 *           description: the address of the user
 *           required: true
 *         phoneNumber:
 *           type: string
 *           description: the phone number of the user
 *           required: true
 *         roles:
 *           type: string
 *           description: the roles of the user
 *           required: false
 *         refreshToken:
 *           type: string
 *           description: the refresh token of the user
 *           required: true
 *         createdAt:
 *           type: string
 *           description: The date and time when the user was created
 *           required: false
 *         updatedAt:
 *           type: string
 *           description: The date and time when the user was updated
 *           required: false
 *       example:
 *         _id: 63437720b30d03bccff76846
 *         username: Longlq2
 *         password: 123456789
 *         name: Le Quang Long
 *         dob: 2001-01-01T00:00:00.000Z
 *         address: Quang Binh
 *         phoneNumber: 012 0123 012
 *         roles: basic
 *         refreshToken: GNMdmsEcRriHyATO3wlRSu6uQg5uZvvpMNkrNQ3aWMmZWy2yCWrcIRRqlx8j82PTAb8c9AmR1zGMI3p5tIPriZ2bfme9CGvunIra
 *         createdAt: 2022-10-18T01:26:59.221+00:00
 *         updatedAt: 2022-10-18T02:19:55.442+00:00
 */

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Get the list of all users
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */

router.get('/', userController.allUsers)


/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             username: Longlq2
 *             password: 123abcdef
 *             name: Le Quang Long
 *             dob: 2001-01-01
 *             address: Quang Binh
 *             phoneNumber: 012 1234 123            
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post('/', [validate(userValidation.createUser, { keyByField: true }, {}), userMiddleware.checkDuplicateUsername, userMiddleware.checkDuplicatePhoneNumber], userController.createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example: 
 *             username: longlq2
 *             password: 123456789
 *     responses:
 *       200:
 *         description: The user login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post('/login', userController.login);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user information by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: Detail user information by user ID
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

router.get('/:id', [userMiddleware.isValidObjectId], userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user information by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Updated successfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

router.put('/:id', [userMiddleware.isValidObjectId], userController.updateUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user information by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

router.delete('/:id', [userMiddleware.isValidObjectId], userController.removeUserbyId);

export default router; 