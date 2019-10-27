import mongoose from 'mongoose';

export default class MongoDB{

   private uri = ('mongodb+srv://amdin:wass123456%40@cluster0-xvo62.mongodb.net/ionic-api?retryWrites=true&w=majority'||process.env.DATABASE_URI); 
   constructor(){}
   
   async startDB(){
    try {
        await mongoose.connect(this.uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }); 
        console.log('Database is connected')   
    } catch (error) {
        console.error(error);
    }
    
   }
   

}