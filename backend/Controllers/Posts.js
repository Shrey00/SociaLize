import { Users, Posts } from '../Models/Model.js';
import multer from 'multer';


function date() {
    var date = new Date();
    return date.toDateString();
}

//to send all the posts made by accounts
export const getPosts = async (req, res) => {
    const allPosts = await Posts.find({});
    for (var i = 0; i < allPosts.length; ++i) {
        await allPosts[i].populate('user');
        await allPosts[i].populate({ path: 'likes' })
    }
    res.json(allPosts);
}

//to send all the user profile data
export const getUserData = async (req, res) => {
    const { firstName, lastName, email, bio, posts } = req.user;
    res.json({ firstName, lastName, email, bio, posts });
}

//@desc
//for uploading a post, including image(if added)

//add image when req.file is not null.,if null, then null will be stored can be checked on the client side 
export const createPost = async (req, res) => {
    if (req.file)
        var { mimetype, buffer } = req.file;
    else
        var mimetype = undefined;
    var { content } = req.body;
    console.log(req.body)
    try {
        if (req.file)
            var b64 = buffer.toString('base64');
        const foundUser = await Users.findById(req.userId);
        const newPost = await Posts.create({
            user: req.userId,
            content: content,
            postImage: {
                img: b64 ? b64 : '',
                mimetype: mimetype ? mimetype : '',
            },
            date: date(),
            likes: [],
            dislikes: [],
            comments: []
        })
        foundUser.posts.push(newPost._id);
        await newPost.save();
        await foundUser.save();
        res.status(200).json({ message: 'success' });
    } catch (err) {
        res.status(500);
    }
}

export const likePost = async (req, res) => {
    const { _id, firstName, lastName } = req.user;
    const { postId } = req.body;
    const obj = { _id, firstName, lastName };
    var post = await Posts.findById(postId);
    function contains(obj) {
        var i;
        for (i = 0; i < post.likes.length; i++) {
            if (post.likes[i]._id == obj._id) {
                return true;
            }
        }
        return false;
    }
    let condition = contains(obj);
    if (!condition){
        post.likes.push(obj);
    }
    await post.save();
    res.status(200);
}
export const dislikePost = async (req, res) => {
    const { _id, firstName, lastName } = req.user;
    const { postId } = req.body;
    const obj = { _id, firstName, lastName };
    var post = await Posts.findById(postId);
    function contains(obj) {
        var i;
        for (i = 0; i < post.dislikes.length; i++) {
            if (post.dislikes[i]._id == obj._id) {
                return true;
            }
        }
        return false;
    }
    let condition = contains(obj);
    if (!condition){
        post.dislikes.push(obj);
    }
    await post.save();
    res.status(200);
}
