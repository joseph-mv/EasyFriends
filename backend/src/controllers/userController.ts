import { Request, Response } from "express";
import userModel from "../model/userModel";
const bcrypt = require("bcrypt");


export const createUser = async (req: Request, res: Response) => {
    console.log("creating")
    try{
        const user=new userModel(req.body)
        const oldUser = await userModel.findOne({ email: user.email });
        if (oldUser) {
            res
              .status(501)
              .json({ message: "oops , The email is already used, try another" });
          } else {
            const saltRounds = 10;
            console.log(user);
            user.password = await bcrypt.hash(user.password, saltRounds);
            user.createdAt = new Date();
            await user.save();
            res.status(201).json({status:true})
          }
    }catch(error){
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
          } else {
            res.status(500).json({ message: "An unknown error occurred" });
          }
    }
  };
