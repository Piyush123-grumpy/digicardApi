import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utils/generatedToken.js';

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            console.log(properties.message)
            errors[properties.path] = properties.message.replace('Path', '');
        })
    }
    if (err.message.includes('User already exists')) {
        errors = { 'errors': 'User exists' }
        return errors
    }
    if (errors.email) {
        errors['email'] = errors['email'].replace('`email`', 'Email');
    }
    if (errors.name) {
        errors['name'] = errors['name'].replace('`name`', 'Name');
    }

    console.log(errors)
    return errors
}

export const signup_get = (req, res) => {
    console.log("Ss")
}
export const login_get = (req, res) => {
    res.render('login');
}


// export const signup_post = async (req, res) => {
//     const { name, email, password } = req.body

//     const userExists = await User.findOne({ email })

//     if (userExists) {
//         res.status(400)
//         throw new Error('User already exists')
//     }
//     console.log(req.body)
//     const user = await User.create({
//         name,
//         email,
//         password,
//     })

//     if (user) {
//         res.status(201).json({
//             token: generateToken(user._id),
//             data: {
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 isAdmin: user.isAdmin,

//             }
//         })
//     } else {
//         res.status(400)
//         throw new Error('Invalid user data')
//     }
// }

export const signup_post = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        console.log(req.body);
        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                token: generateToken(user._id),
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        }
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};





export const login_post = (req, res) => {
    res.render('user login');
}


export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body


    console.log("ssa")

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        console.log("sss")
        res.status(201).json({
            token: generateToken(user._id),
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

