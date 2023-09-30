import Cart from "../model/cartmodel.js";
export const create_cart=async(req,res)=>{
    try {
         const newCart = new Cart({ userId: req.user.id, ...req.body });
       
          const savedCart = await newCart.save();
          res.status(200).json(savedCart);
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const update_cart=async(req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedCart);
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const delete_cart=async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const getallcart=async(req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}
export const getonecart=async(req,res)=>{
    try{
        const cart = await Cart.findOne({ userId: req.params.id });
        res.status(200).json(cart);
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}