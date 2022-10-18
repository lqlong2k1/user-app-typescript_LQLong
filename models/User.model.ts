import mongooseDelete from 'mongoose-delete';
import mongoose from 'mongoose';
import role from '../data/user.role.data';

const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: Date },
    address: { type: String },
    phoneNumber: { type: String },
    roles: { type: String, default: role.ROLE.BASIC },
    refreshToken: { type: String }
}, {
    timestamps: true,
    versionKey: false,
});



//add plugin

// User.plugin(mongooseDelete, {
//     deletedAt: true,
//     overrideMethods: 'all'
// });


export default mongoose.model('User', User);