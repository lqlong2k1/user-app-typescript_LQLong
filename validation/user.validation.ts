import Joi from 'joi';
import userConst from '../const/user.const';
import * as errMessage from '../const/err-messages.const';
const validationDataInput = {
    username: Joi.string()
        .min(6).messages({ 'string.min': errMessage.MINIMUM_LENGTH_USERNAME})
        .regex(userConst.USERNAME_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_USERNAME }),

    password: Joi.string()
        .min(8)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_PASSWORD }),
    name: Joi.string()
        .trim()
        .regex(userConst.NAME_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_NAME }),
    dob: Joi.date()
        .max('01-01-2004')
        .iso()
        .required()
        .messages({
            'date.format': errMessage.INVALID_FORMAT_BIRTHDAY,
            'date.max': errMessage.INVALID_MINIMUN_BIRTHDAY,
        }),
    phoneNumber: Joi.string()
        .trim()
        .regex(userConst.PHONE_NUMBER_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_PHONE_NUMBER }),
    address: Joi.string()
        .trim()
        .required()
        .messages({ 'string.parttern.base': errMessage.INVALID_ADDRESS }),
    roles: Joi.string()
}
export default {
    createUser: {
        body: Joi.object(validationDataInput),
    },


}
