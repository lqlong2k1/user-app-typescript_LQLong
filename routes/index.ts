import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validation'
import userRouter from './user.routes';
function route(app: any): void {
    app.use('/users', userRouter)
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        if (err instanceof ValidationError) {
                  console.log(err)
            res.status(400).send(err);
        }
        // res.status(500).send('Something broken');
        res.status(err.statusCode).send('{\nERROR: Something has broken\n}');
    })
}

export default route;