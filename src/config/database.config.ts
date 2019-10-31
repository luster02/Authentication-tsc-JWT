import mongoose from 'mongoose';

export default class MongoDB{

   private uri = process.env.DATABASE_URI;
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