import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';

export default class TestController {


    constructor(){}

    login(req: Request, res: Response){

        const body = req.body;

        User.findOne({email: body.email}, (err, userDB) => {
            
            if(err) throw err;

            if(!userDB){
                return res.json({
                    ok: false,
                    message: 'user/password incorrect'
                });
            };

            if(userDB.comparePassword( body.password )){
                return res.json({
                    ok: true,
                    token: 'asdqw2e13213q5w4e'
                });
            }else{
                return res.json({
                    ok: false,
                    message: 'user/password incorrect ***'
                });
            }

        });

    }

    async createUser(req: Request, res: Response){
        
        const user = {
            name     : req.body.name, 
            email    : req.body.email,
            password : bcrypt.hashSync(req.body.password, 10),
            avatar   : req.body.avatar,
        }

        try {
            await User.create(user);
            res.json({
                ok: true,
                user: user
            });
        } catch (error) {
            res.json({
                ok: false,
                error: error
            });
        }

        
    }

}