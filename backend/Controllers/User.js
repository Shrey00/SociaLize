import { Users } from '../Models/Model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;  //for password encryption
export const signup = async (req, res) => {
        const { firstName, lastName, email, password } = req.body; //gets the signUp details
        console.log(firstName, lastName, email, password)
        if (!firstName || !lastName || !email || !password) {
                res.status(400).json({ status: 400, error: 'Please enter all the fields' });
        }
        else {
                const user = await Users.findOne({ email: email }); //checks if the user already exists
                if (!user) {       //if the user does not exist, the user can sign up
                        bcrypt.hash(password, saltRounds, async (err, hash) => {   //hash the password entered by user
                                try {
                                        const createdUser = await Users.create({                   //saves the details entered by user to db and the sign up is done
                                                firstName: firstName,
                                                lastName: lastName,
                                                email: email,
                                                password: hash,
                                        })
                                        const token = generateAccessToken(createdUser);
                                        res.status(200).json({ token: token })
                                } catch (err) {
                                        res.status(400).json({ status: 400, error: 'Invalid Credentials' });
                                        console.log(err.message);
                                }
                        });
                }
        }
}



//@desc for Login 
//@access : public
export const signin = async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password);
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
                bcrypt.compare(password, existingUser.password, (err, result) => {
                        if (result) {
                                const token = generateAccessToken(existingUser);
                                res.json({ token: token })
                        } else {
                                res.status(400).json({ status: 400, error: 'Invalid Credentials' });
                        }
                })
        }
}

export const updateBio = async (req, res) => {
        const { bio } = req.body;
        console.log(bio)
        const foundUser = await Users.findById(req.userId);
        foundUser.bio = bio;
        await foundUser.save();
        res.json({ message: 'success' })
}

// @desc 
// for uploading profile picture.
export const profileImage = async (req, res) => {
        const { mimetype, buffer } = req.file;
        console.log(mimetype)
        const b64 = buffer.toString('base64');
        try {
                const foundUser = await Users.findById(req.userId);
                foundUser.profileImage.mimetype = mimetype;
                foundUser.profileImage.img = b64;
                await foundUser.save();
                res.status(200).json({ message: 'success' });
        } catch (err) {
                res.status(500);
        }
}

//generates jsonwebtoken
function generateAccessToken(existingUser) {
        return jwt.sign({
                id: existingUser.id
        }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export const getMe = (req, res) => {
        res.status(200).json(req.user);
}

export const people = async (req, res) => {
        const people = await Users.find({});
        const { _id } = req.user;
        var followedPeople = [];
        var nonFollowedPeople = [];
        var sortedPeople = [];
        function contains(obj, user) {
                var i;
                for (i = 0; i < user.followers.length; i++) {
                        if (user.followers[i]._id == obj) {
                                return true;
                        }
                }
                return false;
        }
        for (var i = 0; i < people.length; i++) {
                if (contains(_id, people[i])) {
                        followedPeople.push(people[i]);
                } else {
                        nonFollowedPeople.push(people[i])
                }
        }
        var sortedPeople = [...followedPeople, ...nonFollowedPeople]
        res.status(200).json(sortedPeople);
}

export const profile = async (req, res) => {
        const { _id } = req.body;
        try {
                const profile = await Users.findById(_id).select('-password');
                // console.log profile.followers)
                await profile.populate('followers', 'email firstName lastName profileImage');
                console.log(profile.followers)
                // await profile.populate('following');
                await profile.populate('posts');
                res.status(200).json({ profile });
        } catch (e) {
                console.log(e)
                res.status(500);
        }
}

export const followSomeone = async (req, res) => {

        try {
                const { followId } = req.body;
                console.log(followId)
                req.user.following.push(followId);
                await req.user.save();
                const foundUser = await Users.findById(followId);
                foundUser.followers.push(req.user._id);
                await foundUser.save();
                console.log('followers' + foundUser.followers + '  following ' + foundUser.following)
                res.status(200);
        }
        catch (e) {
                res.status(500);
        }
}

export const unfollowSomeone = async (req, res) => {

        try {
                const { unfollowId } = req.body;
                for (var i = 0; i < req.user.following.length; ++i) {
                        if (req.user.following[i] == unfollowId) {
                                req.user.following.splice(i, 1);
                                break;
                        }
                }
                await req.user.save();
                let foundUser = await Users.findById(unfollowId);
                
                for (var j = 0; j < foundUser.followers.length; ++j) {  
                        console.log('le bata bhai ti hi : ' + foundUser.followers[0].toString().trim() == req.user._id.toString().trim())
                        if (foundUser.followers[j].toString() == req.user._id.toString()) {
                                foundUser.followers.splice(j, 1);
                                break;
                        }
                }
                await foundUser.save();
                res.status(200);
        }
        catch (e) {
                res.status(500);
        }
}
