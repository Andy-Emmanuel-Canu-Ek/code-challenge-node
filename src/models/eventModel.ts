import {Schema, model, Document} from 'mongoose';
import {User} from './userModel'

export interface Event extends Document{
    title: string,
    desc: string,
    start_date: Date,
    end_date: Date,
    user: User
}

const EventSchema: Schema = new  Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    start_date:{
        type: Date,
        required: true
    },
    end_date:{
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

EventSchema.method('toJSON', function(){
    const {_id, __v, ...obj} = this.toObject();
    obj.id = _id;
    return obj;
})

export default model<Event>('Event', EventSchema)