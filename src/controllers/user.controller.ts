import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import Token from '../config/token.config';

export default class TestController {


    constructor() { }

    login(req: Request, res: Response) {

        const body = req.body;

        User.findOne({ email: body.email }, (err, userDB) => {

            if (err) throw err;

            if (!userDB) {
                return res.json({
                    ok: false,
                    message: 'user/password incorrect'
                });
            };

            if (userDB.comparePassword(body.password)) {

                const tokenUser = Token.getJWToken({
                    _id: userDB._id,
                    name: userDB.name,
                    email: userDB.email,
                    avatar: userDB.avatar
                });

                return res.json({
                    ok: true,
                    token: tokenUser
                });

            } else {
                return res.json({
                    ok: false,
                    message: 'user/password incorrect ***'
                });
            }

        });

    }

    createUser(req: Request, res: Response) {

        const user = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.body.avatar,
        }


        User.create(user).then(userDB => {
            const tokenUser = Token.getJWToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email,
                avatar: userDB.avatar
            });
            return res.json({
                ok: true,
                token: tokenUser
            });
        }).catch(err => {
            res.json({
                ok: false,
                error: err
            });
        });

    }

    update(req: any, res:Response){

        const user = {
            name   : req.body.name   ||req.body.name ,
            email  : req.body.email  ||req.body.email ,    
            avatar : req.body.avatar ||req.body.avatar ,         
        }

        User.findByIdAndUpdate(req.user._id, user, {new: true}, (err, userDB:any) => {
            
            if(err) throw err;

            if(!user){
                return res.json({
                    ok:false,
                    message: 'not find user ID'
                });
            }

            const tokenUser = Token.getJWToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email,
                avatar: userDB.avatar
            });
            return res.json({
                ok: true,
                token: tokenUser
            });

        });

        
    }

}