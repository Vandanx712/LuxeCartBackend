import { Buyer } from "../models/buyer/buyer.model.js";
import { DeliveryBoy } from "../models/seller/deliveryboy.model.js";
import { Seller } from "../models/seller/seller.model.js";



export const findUserByEmail = async(email) => {

    let user = await Buyer.findOne({ email });
    if (user) return user ;

    user = await DeliveryBoy.findOne({ email });
    if (user) return user;

    user = await Seller.findOne({ email });
    if (user) return user;

    return null;
}