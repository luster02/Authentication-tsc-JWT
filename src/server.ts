import express from 'express';
import morgan from 'morgan'; 
import Database from './database';
import UserRoutes from './routes/user';

const database = new Database();

export default class Server{
    
    public app: express.Application;

    
    constructor(){
        this.app = express();
        this.config()
    }


    config(){
       this.app.set('port', process.env.PORT || 3000);
    }

    middewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}))
    }

    routes(){
        this.app.use('/users',UserRoutes);
    }

    start( callback:any ){
        this.app.listen( this.app.get('port'), callback );
        database.startDB();
        this.middewares();
        this.routes();
    }

}