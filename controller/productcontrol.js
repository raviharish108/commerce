import Products from "../model/productmodel.js";

export const create_product=async(req,res)=>{
    try{
        const newProduct = new Products(req.body);
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        return res.status(500).json({msg: err.message}) 
    }
}

export const update_product=async(req,res)=>{
    try{
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id,{$set:req.body},{ new: true });
          res.status(200).json(updatedProduct);
    }catch(err){
        return res.status(500).json({msg: err.message}) 
    }
}

export const get_one_product=async(req,res)=>{
    try{
        const product = await Products.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        return res.status(500).json({msg: err.message}) 
    }
}
export const get_all_product=async(req,res)=>{
        const qNew = req.query.new;
        const qCategory = req.query.category;
        try {
          let products;
      
          if (qNew) {
            products = await Products.find().sort({ createdAt: -1 }).limit(1);
          } else if (qCategory) {
            products = await Products.find({
              categories: {
                $in: [qCategory],
              },
            });
          } else {
            products = await Products.find();
          }
      
          res.status(200).json(products);
    }catch(err){
        return res.status(500).json({msg: err.message}) 
    }
}

export const delete_product=async(req,res)=>{
  try{
    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  }catch(err){
    return res.status(500).json({msg: err.message}) 
  }
}