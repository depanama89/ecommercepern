import { RequestHandler } from "express";
import { productProps } from "../../utils/allInterfaces";

export const getAllproducts:RequestHandler=async(req,res,next)=>{
res.status(200).json("getAllproduct")
}
export const getProductById:RequestHandler=async(req,res,next)=>{
res.status(200).json("getAllproductbyiid")
}

export const createProduct:RequestHandler<unknown,unknown,productProps,unknown>=async(req,res,next)=>{

}
export const updateProduct:RequestHandler<unknown,unknown,unknown,unknown>=async(req,res,next)=>{
    
}
export const deleteProduct:RequestHandler<unknown,unknown,unknown,unknown>=async(req,res,next)=>{

}