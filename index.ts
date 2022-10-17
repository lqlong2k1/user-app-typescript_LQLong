import express from 'express';
import route from './routes';
import db from './db/db';

const app = express();
const PORT = 8081;

db.connect();

app.use(
    express.urlencoded({
        extended: true, //body-parser
    }),
); //middleware

app.use(express.json());
// app.use(setUser)
route(app); 

app.listen(PORT,()=>{
    console.log(`App listening at http://localhost:${PORT}`);
})

