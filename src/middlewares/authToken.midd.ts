import { Response, NextFunction } from 'express';
import Token from '../config/token.config';

export const verifyToken = (req: any, res: Response, next: NextFunction) => {

    const userToken = req.get('x-token') || '';

    Token.compareToken( userToken )
        .then( (decoded:any) => {
            console.log('Decoded', decoded);
            req.user = decoded.user;
            next();
        }).catch(err =>{
            res.json({
                ok:false,
                message: 'invalid token!!',
                error: err
            })
        });

};