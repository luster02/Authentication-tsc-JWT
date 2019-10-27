import jwt from 'jsonwebtoken';


export default class Token {

    private static seed: string = ('private-token-one-ionic-api' || process.env.SEEDTOKEN);
    private static duration: string = '30d';

    constructor(){}

    static getJWToken( payload: any ):string{

        return jwt.sign({
            user: payload
        }, this.seed, {expiresIn: this.duration});

    }

    static compareToken( userToken: string ){
        return new Promise( (resolve, reject)  => {

            jwt.verify( userToken, this.seed, (err, decoded) => {
                if(err){
                    reject()
                }else{
                    resolve(decoded)
                }
            });
            

        });
    }

}