import {Schema, model, Document} from 'mongoose';

export interface User extends Document{
    name: string,
    email: string,
    password: string
}

const UserSchema: Schema = new  Schema({
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