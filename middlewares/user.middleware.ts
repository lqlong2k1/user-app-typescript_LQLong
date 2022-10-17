import User from '../models/User.model';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import * as errMessage from '../const/err-messages.const';
const ObjectId = mongoose.Types.ObjectId;

export default {
    checkDuplicateUsername(req: Request, res: Response, next: NextFunction) {
        User.findOne({
            username: req.body.username
        }).exec((err: Error, user) => {
            if (err) {
                res.status(500).send({ ERROR: err });
                return;
            }
            if (user) {
                res.status(400).send({ ERROR: errMessage.EXIST_USERNAME });
                return;
            }
            next();
        })
    },
    
    checkDuplicatePhoneNumber(req: Request, res: Response, next: NextFunction) {
        User.findOne({
            phoneNumber: req.body.phoneNumber
        }).exec((err: Error, phoneNumber) => {
            if (err) {
                res.status(500).send({ ERROR: err });
                return;
            }
            if (phoneNumber) {
                res.status(400).send({ ERROR: errMessage.EXIST_PHONE_NUMBER });
                return;
            }
            next();
        })

    },
    isValidObjectId(req: Request, res: Response, next: NextFunction) {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).send({ ERR: errMessage.INVALID_ID })
            return;
        }
        next();
    }
}
