import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({

    name: {
        type: String,
        required: [true, 'the name is required']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: [true, 'the email is already taken'],
        required: [true, 'the email is required']
    },
    password: {
        type: String,
        required: [true, 'the password is required']
    }

});

UserSchema.method('comparePassword', function(password: string = ''):boolean{
    if(bcrypt.compareSync(password, this.password)){
        return true;
    }else{
        return false;
    }
});

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar:string;

    comparePassword(password: string): boolean; 
}

export const User = model<IUser>('User', UserSchema);