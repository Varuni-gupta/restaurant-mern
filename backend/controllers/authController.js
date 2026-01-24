import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//token
const generateToken = (res, payload) => {
    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
    res.cookie("token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:24*60*60*1000
    });
    return token;
   
}
//register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error in Registration",
    });
  }
};

//login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // ✅ FIX HERE
        generateToken(res, {
            id: user._id,
            role: user.isAdmin ? "admin" : "user",
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Error in Login",
        });
    }
};

//logout
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ message: "Logout successful", success: true });
    }
    catch (error)
    {
        console.log(error.message);
       return  res.json({
            success: false,
            message: "Error in Logout",
            error,
        });
    }
}
//admin login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.json({
                success: false, message: "All fields are required"
            });
        }
        const adminEmail=process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (email != adminEmail || password != adminPassword)
        {
            return res.json({
                success:false,message:"Invalid Admin Credentials"
            });
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.cookie("token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:24*60*60*1000
            });
        return res.json({ message: "Admin Login Successful", success: true })
        }
    
    catch (error)
    {
        console.log(error.message);
        return res.json({message:"Error in Admin Login",success:false,error});
    }
}
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user)
        {
            return res.status(404).json({message:"User not found",success:false});
        }
        res.json(user);
    }
    catch (error)
    {
        return res.json({message:"Error in fetching profile",success:false,error});
    }
}
export const isAuth = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id).select("-password");
        res.json({ success: true, user });
    }
    catch (error)
    {
        console.log(error);
        return res.json({ message: "Internal server error", success: false });
    }
}