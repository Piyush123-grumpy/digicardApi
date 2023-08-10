import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

export const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            token=req.headers.authorization.split(' ')[1]
            console.log(token)
            const decoded=jwt.verify(token,'abc123')

            req.user=await User.findById(decoded.id).select('-password')
            next()
        }catch(error){
            console.error(error)
            res.status(401)

            throw new Error('Not authroized,token failed ')

        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized not token')
    }

}) 