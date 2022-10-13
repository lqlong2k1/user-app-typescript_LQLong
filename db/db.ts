import mongoose from 'mongoose';
import * as local from '../config/local';

async function connect() {
    try {
        await mongoose.connect(local.dbUrl);
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('ERROR:   ' + error);
        console.log('Connect fail!');
    }
}
export default { connect };
