import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




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

export const login = async (req: Request, res: Response) => {
    try{
      const user = req.body;
      const existUser=await userModel.findOne({ email: user.email })
      if (existUser) {
          // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(user.password,existUser.password);
        console.log(isMatch)
        if (!isMatch) {
          res.status(401).json({ message: 'Invalid password.' });
        }else{
          const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
          });
          res.status(200).json({status:true,user:existUser,token})
        }
      }else{
        res.status(501).json({message:'User not found'})
      }
    }catch(error){
      res.status(500).json({ message: 'Internal server error.' });
    }
    
  };

 export const filterUsers=async(req:Request,res:Response)=>{
  console.log('fil')
  const { term } = req.query;
  console.log(term)
try{
  const users=await userModel.find({
    $or: [
           { firstName: { $regex: term, $options: "i" } },
               { lastName: { $regex: term, $options: "i" } },
               { email: { $regex: term, $options: "i" } },
          ],
  }).limit(5)

  res.status(200).json(users);
 

}catch(error){

}

 } 

//  try {
//   if (term ) {
//     // If a search term is provided, search users by name or email
//     const users = await userModel.find({
//       $or: [
//         { firstName: { $regex: term, $options: "i" } },
//         { lastName: { $regex: term, $options: "i" } },
//         { email: { $regex: term, $options: "i" } },
//       ],
//     }).select("firstName lastName email image hobbies friendsCount");

//     return res.status(200).json(users);
//   } else {
//     // If no search term is provided, return 10 random users
//     const users = await userModel.aggregate([{ $sample: { size: 10 } }])
      
// console.log(users)
//     return res.status(200).json(users);
//   }
// } catch (error) {
//   console.error("Error searching users:", error);
//   res.status(500).json({ message: "Error searching users" });
// }


