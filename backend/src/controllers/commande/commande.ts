import { RequestHandler } from "express";

export const getAllCommande:RequestHandler=async(req,res,next)=>{

}

export const createCommande:RequestHandler=async(req,res,next)=>{
 
}
export const checkCommande:RequestHandler=async(req,res,next)=>{
 res.status(200).json({
    message:"checkout realiser avec succes"
 })
}
export const updateCommande:RequestHandler=async(req,res,next)=>{

}