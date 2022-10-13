import express from 'express';
import route from './routes';
import db from './db/db';
import session from 'express-session';

const TWO_HOURS: Number = 1000 * 60 * 60 * 2;
const {
    PORT = 8080,
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET = 'ssh!quiet,it\'sasecret!',
    SESS_LIFETIME = TWO_HOURS,
} = process.env;

const IN_PROD = NODE_ENV === 'production'

const app = express();

db.connect();

app.use(
    express.urlencoded({
        extended: true, //body-parser
    }),
); //middleware
app.use(express.json());
// app.use(setUser)
app.use(session({
    name: SESS_NAME,
    resave: true,
    saveUninitialized: true,
    secret: SESS_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true,
        secure: IN_PROD
    }
}));

route(app);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})

