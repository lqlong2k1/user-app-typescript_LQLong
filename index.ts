import express from 'express';
import route from './routes';
import db from './db/db';

import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app = express();
const PORT = 8080;

db.connect();

app.use(
    express.urlencoded({
        extended: true, //body-parser
    }),
); //middleware

app.use(express.json());
// app.use(setUser)
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "A simple Express User API",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./routes/user.routes.ts"]
};
const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
route(app);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})

