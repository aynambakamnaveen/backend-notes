import User from '../Models/user.model.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const jwt_secrete = process.env.JWT_SECRETE
const register = async (req,res)=>{
    const {email,username,password} = req.body;
    const isuser = await User.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if (isuser){
        return res.status(409).json({message:"User already exists"})
    }
    const hash = await bcrypt.hash(password,10)
    const newuser = await User.create({
        email,
        username,
        password:hash
    })
    
    const token = jwt.sign(
    {
        id: newuser._id,
        username: newuser.username
    },
    jwt_secrete,
    { expiresIn: "7d" }
    );

    res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true
    });

    res.status(201).json({
        message:'User Created successfully',
        user:{
            id:newuser._id,
            email:newuser.email,
            username:newuser.username
        }
    })

}

export default register;
