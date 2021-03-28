import {Schema, model, Document} from 'mongoose';

export interface User extends Document{
    user_name: string,
    name: string,
    email: string,
    password: string
}

const UserSchema: Schema = new  Schema({
    user_name: {
        type: String,
        require: true,
        unique: true,
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    }
})

export default model<User>('User', UserSchema)