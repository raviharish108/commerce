import Users from "../model/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

export const Register=async(req,res)=>{
    try{
        const {name, email, password} = req.body;

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "The email already exists."})

            if(password.length < 6) 
                return res.status(400).json({msg: "Password is at least 6 characters long."})

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })

            // Save mongodb
            await newUser.save()

            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newUser._id})
            res.json({accesstoken});
    }catch(err){
           return res.status(500).json({msg: err.message})   
    }
}

export const login=async(req,res)=>{
    try{
        const {email, password} = req.body;

        const user = await Users.findOne({email})
        if(!user) return res.status(400).json({msg: "User does not exist."})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg: "Incorrect password."})

        // If login success , create access token and refresh token
        const token = createAccessToken({id: user._id})
        return res.json({username:user.username,email:user.email,accesstoken:token})
    }catch(err){
        return res.status(500).json({msg: err.message})

    }
}

export const updateuser=async(req,res)=>{
    try{
        const updatedUser = await Users.findByIdAndUpdate(req.params.id,{$set: req.body,},{new:true});
          res.status(200).json(updatedUser);
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}

export const getuser=async(req,res)=>{
    try{
        const user = await Users.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);

    }catch(err){
            return res.status(500).json({msg: err.message}) 
    }
}
 export const getall=async(req,res)=>{
    try{
        const query = req.query.new;
        const users = query? await Users.find().sort({ _id: -1 }).limit(5):await Users.find();
      res.status(200).json(users);
    }catch(err){
        return res.status(500).json({msg: err.message}) 
    }
 }

 export const deletee=async(req,res)=>{
    try{
        await Users.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    }catch(err){
        return res.status(500).json({msg: err.message}) 
    }
 }
  

 export const getuserbymonth=async(req,res)=>{
    try{const data = await Users.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                {
                  $project: {
                    month: { $month: "$createdAt" },
                  },
                },
                {
                  $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                  },
                },
              ]);
              res.status(200).json(data)

    }catch(err){
        return res.status(500).json({msg: err.message}) 
    }
 }
  
//   router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
//     try {
//       const data = await User.aggregate([
//         { $match: { createdAt: { $gte: lastYear } } },
//         {
//           $project: {
//             month: { $month: "$createdAt" },
//           },
//         },
//         {
//           $group: {
//             _id: "$month",
//             total: { $sum: 1 },
//           },
//         },
//       ]);
//       res.status(200).json(data)
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });