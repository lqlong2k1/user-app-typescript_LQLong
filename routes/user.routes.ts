import express from 'express';
import { validate } from 'express-validation';
import userValidation from '../validation/user.validation';
import userMiddleware from '../middlewares/user.middleware';
import userController from '../controllers/user.controller';

const router = express.Router();

router.get('/', userController.allUsers)
router.post('/', [validate(userValidation.createUser,{keyByField: true},{}), userMiddleware.checkDuplicateUsername,userMiddleware.checkDuplicatePhoneNumber], userController.createUser);
router.post('/login',userController.login);
router.get('/:id', [userMiddleware.isValidObjectId], userController.getUserById);
router.put('/:id', [userMiddleware.isValidObjectId], userController.updateUserById);
// router.delete('/:id', [userMiddleware.isValidObjectId], userController.deleteUserById);
router.delete('/:id', [userMiddleware.isValidObjectId], userController.removeUserbyId);

export default router; 