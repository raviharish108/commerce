import express from "express";
import { connect } from "./connect.js";
import * as dotenv from "dotenv";
import cors from "cors";
import userroutes from "./routes/userroutes.js"
import productroutes from "./routes/productroutes.js"
import cartroutes from "./routes/cartroutes.js";
import orderroutes from "./routes/orderroutes.js";
import paymentroutes from "./routes/paymentRoutes.js"


dotenv.config();
const PORT= 5000;
const app=express();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("hello world")
})

 app.use("/api/user",userroutes);
 app.use("/api/product",productroutes);
 app.use("/api/cart",cartroutes);
 app.use("/api/order",orderroutes);
 app.use("/api/pay",paymentroutes);

// app.post("/api/send/txt",async(req,res)=>{
//     try{
//          const{txt,from_email}=req.body;
//          await sendTxt(txt,from_email);
//          return res.status(200).json({msg:"successfully message send"})
//     }catch(err){
//         return res.status(400).json({msg:err.message})
//     }
// })
app.listen(PORT, async() => {
    await connect();
    await console.log('Server is running on port', PORT)
})