import User from '../models/User.model';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { IUser } from '../interface/user.interface';
import * as errMessage from '../const/err-messages.const';
const ObjectId = mongoose.Types.ObjectId;


export default {
    checkDuplicateUsername(req: Request, res: Response, next: NextFunction) {
        User.findOne({
            username: req.body.username
        }).exec((err: any, user) => {
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
        }).exec((err: any, phoneNumber) => {
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
    },

    isLogin(req: Request, res: Response, next: NextFunction) {
        const session = req.session;
        if (!session) {
            // res.redirect('/');
            res.send(session)
            return;
        }
        next();
    },
    // authenticate(req: Request, res: Response, next: NextFunction) {
    //     console.log(req.session);
    //     if (req.session.authenticated) {
    //         next();
    //     } else {
    //         res.end("Not logged in");
    //     }
    // }
}

