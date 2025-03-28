import mongoose from "mongoose";



const productAttributeSchema = new mongoose.Schema(
    {
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product"
     },
      key: {
         type: mongoose.Schema.Types.String,
        }, // e.g., "Color", "RAM"
      value: { 
        type: mongoose.Schema.Types.Mixed
     }, // Can be String, Number, Boolean, Array
    },
    { timestamps: true }
  );


  export const ProductAttribute = mongoose.model('ProductAttribute',productAttributeSchema)