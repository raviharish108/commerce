import  express  from "express";
import { Register,login,updateuser,getuser,getall,deletee,getuserbymonth } from "../controller/usercontrol.js";
import { verifyTokenAndAdmin,verifyTokenAndAuthorization,verifyToken} from "../middlewares/verifyAuth.js";
const router=express.Router();
router.post("/reg", Register);
router.post("/login", login);
router.put("/update/:id",verifyTokenAndAuthorization,verifyToken,updateuser);
router.get("/get/:id",verifyTokenAndAdmin,verifyToken,getuser);
router.get("/getall",verifyTokenAndAdmin,verifyToken,getall);
router.delete("/delete/:id",verifyTokenAndAuthorization,deletee);

export default router;