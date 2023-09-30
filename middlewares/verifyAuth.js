import  jwt  from "jsonwebtoken";

export const verifyToken=async(req,res,next)=>{
const token=req.header("authorization")
if(!token){
    return res.status(400).json({msg:"invalid token"})
}
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err){
        return res.status(400).json({msg:"token is  not valid."})
    }
    // console.log(user);
    req.user=user;
    next();
})
}

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  
  export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  