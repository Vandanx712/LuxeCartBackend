import mongoose from "mongoose";


const categorySchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            trim: true
        },
        description: {
            type: mongoose.Schema.Types.String
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category", default: null
        }, // For subcategories
        is_active: {
            type: mongoose.Schema.Types.Boolean,
            default: true
        }, // Enable or disable category
    }
);


export const Category = mongoose.model('Category',categorySchema)