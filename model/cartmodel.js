
import mongoose from "mongoose";
const CartSchema = new mongoose.Schema(
    {
      userId: { type: String, required: true },
      productId: {type: String},
      quantity: {type: Number,default: 1},
      color:{type:String},
      size:{type:String},
      price:{type:Number}
    },
    { timestamps: true }
  );
  export default mongoose.model("Cart",CartSchema)
 
  