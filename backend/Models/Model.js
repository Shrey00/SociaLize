import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    bio: {
        type: String,
    },
    profileImage: {
        img: String,
        mimetype: String
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
    followers : [{type: Schema.Types.ObjectId, ref: 'Users'}],
    following : [{type: Schema.Types.ObjectId, ref:'Users'}]
});

const postSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    content: {
        type: String
    },
    postImage: {
        img: String,
        mimetype: String
    },
    date: {
        type:String,
    },
    likes : [{_id:String,firstName:String,lastName:String}],
    dislikes : [{_id:String,firstName:String,lastName:String}],
    comments : [{user: {type:Schema.Types.ObjectId, ref:'Users'}, comment: String}]
})

export const Users = mongoose.model('Users', userSchema);
export const Posts = mongoose.model('Posts', postSchema);