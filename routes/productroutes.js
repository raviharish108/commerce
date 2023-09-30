import  express  from "express";
import { create_product,update_product,get_one_product,get_all_product,delete_product} from "../controller/productcontrol.js";
import { verifyTokenAndAdmin } from "../middlewares/verifyAuth.js";
const router=express.Router();
router.post("/create_product",create_product);
router.put("/update_product/:id",update_product);
router.get("/get_product/:id",get_one_product);
router.get("/get_all_products",get_all_product);
router.delete("/delete/:id",delete_product);


export default router;