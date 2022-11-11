import jwt from 'jsonwebtoken';
import {Posts, Users} from '../Models/Model.js';
async function authenticate(req, res, next) {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedToken.id;
            const foundUser = await Users.findById(decodedToken.id).select('-password');
            // const foundPosts = await Posts.find({user:req.userId});
            await foundUser.populate('posts');
            req.user = foundUser;
            next();
        }
    }
    catch (e) {
        console.log(e.message);
        res.status(401);
    }
}

export default authenticate;

