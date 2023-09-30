import  express  from "express";
import { verifyToken } from "../middlewares/verifyAuth.js";
import { create_order,updateorder,deleteorder,getorder,getallorder,getincome} from "../controller/ordercontrol.js"; 
const router=express.Router();
router.post("/createorder",create_order);
router.put("/:id",updateorder);
router.delete("/:id",deleteorder);
router.get("/getorder/:userId",getorder);
router.get("/getall",getallorder);
router.get("/income",getincome);

export default router;