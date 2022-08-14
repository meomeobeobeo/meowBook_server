import Users from "../model/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await Users.findOne({ email: email })



        if (!existingUser) {
            res.status(404).json({ message: "User not found." })
            console.log('invalid email...')
            return false

        }




        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)


        if (!isPasswordCorrect) {
            res.status(400).json({ message: "password is incorrect." })
            return false
        }
        const tokenId = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.hashPassword, { expiresIn: '1h' })
       


        res.status(200).json({
            user: {...existingUser._doc , password :'hihihihi'},
            tokenId: tokenId
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
        res.status(500).json({ message: 'Wrong >>>>>>>>' })
    }

}
export const signUp = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;
    try {
        const existingUser = await Users.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ 'message': 'user registered email' })
        }
        if (password !== confirmPassword) {
            return res.status(403).json({ 'message': 'password do not match' })
        }


        // hash password truoc khi luu vao database 
        const hashPassword = await bcrypt.hash(password, 12)
        const theNewUser = await Users.create({ email: email, password: hashPassword, name: `${firstName} ${lastName}`, imgIds: [], listAvatarUrl: [] })
       


        const tokenId = jwt.sign({ email: theNewUser.email, id: theNewUser._id }, process.env.hashPassword, { expiresIn: '1h' })


        res.status(200).json({
            user: {...theNewUser._doc , password :'hihihihi'},
            tokenId: tokenId
        })



    } catch (error) {
        console.log(error)
    }

}