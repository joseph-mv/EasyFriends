import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const createUser = async (req: Request, res: Response) => {
  console.log("creating");
  try {
    const user = new userModel(req.body);
    const oldUser = await userModel.findOne({ email: user.email });
    if (oldUser) {
      res
        .status(501)
        .json({ message: "oops , The email is already used, try another" });
    } else {
      const saltRounds = 10;
      user.password = await bcrypt.hash(user.password, saltRounds);
      user.createdAt = new Date();
      await user.save();
      res.status(201).json({ status: true });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const existUser = await userModel.findOne({ email: user.email });
    if (existUser) {
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(user.password, existUser.password);
      console.log(isMatch);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid password." });
      } else {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ status: true, user: existUser, token });
      }
    } else {
      res.status(501).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const filterUsers = async (req: Request, res: Response) => {
  const { term } = req.query;
  console.log(term);
  try {
    const users = await userModel
      .find({
        $or: [
          { firstName: { $regex: term, $options: "i" } },
          { lastName: { $regex: term, $options: "i" } },
          { email: { $regex: term, $options: "i" } },
        ],
      })
      .limit(5);

    res.status(200).json(users);
  } catch (error) {}
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.query;
  console.log(id);
  try {
    const user = await userModel.findById(id);

    res.status(200).json(user);
  } catch (error) {}
};

export const friendRequest = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;
  console.log(senderId, receiverId);

  try {
    // Find both the sender and receiver from the database
    const sender = await userModel.findById(senderId);
    const receiver = await userModel.findById(receiverId);

    // Check if both users exist
    if (!sender || !receiver) {
      res.status(404).json({ message: "Sender or Receiver not found" });
      return;
    }

    // Push senderId to receiver's getRequests if  not in the array
    if (!receiver.getRequests.includes(senderId)) {
      receiver.getRequests.push(senderId);
      await receiver.save(); // Save the updated receiver document
    }

    // Push receiverId to sender's sendRequests if not in the array
    if (!sender.sendRequests.includes(receiverId)) {
      sender.sendRequests.push(receiverId);
      await sender.save(); // Save the updated sender document
    }

    // Respond with success
    res
      .status(200)
      .json({ message: "Friend request sent successfully", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const cancelRequest = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;
  console.log("sender receiver", senderId, receiverId);

  try {
    const result1 = await userModel.updateOne(
      { _id: senderId },
      { $pull: { sendRequests: receiverId } }
    );
    console.log(res);

    const result2 = await userModel.updateOne(
      { _id: receiverId },
      { $pull: { getRequests: senderId } }
    );

    if (result1.modifiedCount > 0) {
      res.status(200).json({
        message: `Friend with ID removed successfully.`,
        status: true,
      });
    } else {
      console.log(`No matching friend found to remove.`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const declineRequest = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;
  console.log("sender receiver", senderId, receiverId);

  try {
    const result1 = await userModel.updateOne(
      { _id: senderId },
      { $pull: { sendRequests: receiverId } }
    );
    console.log(res);

    const result2 = await userModel.updateOne(
      { _id: receiverId },
      { $pull: { getRequests: senderId } }
    );

    if (result1.modifiedCount > 0) {
      res.status(200).json({
        message: `Friend with ID removed successfully.`,
        status: true,
      });
    } else {
      console.log(`No matching friend found to remove.`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const acceptRequest = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;
  try {
    const result1 = await userModel.updateOne(
      { _id: senderId },
      { $pull: { sendRequests: receiverId } },

    );

    const result2 = await userModel.updateOne(
      { _id: receiverId },
      { $pull: { getRequests: senderId } },
    );

    const sender = await userModel.findById(senderId);
    const receiver = await userModel.findById(receiverId);

    // Check if both users exist
    if (!sender || !receiver) {
      res.status(404).json({ message: "Sender or Receiver not found" });
      return;
    }

    // Push senderId to receiver's getRequests if  not in the array
    if (!receiver.friends.includes(senderId)) {
      receiver.friends.push(senderId);
      await receiver.save(); // Save the updated receiver document
    }

    // Push receiverId to sender's sendRequests if not in the array
    if (!sender.friends.includes(receiverId)) {
      sender.friends.push(receiverId);
      await sender.save(); // Save the updated sender document
    }

    if (result1.modifiedCount > 0) {
      res.status(200).json({
        message: `Friend request accept successfully.`,
        status: true,
      });
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unFriend = async (req: Request, res: Response) => {
  const { userId,friendId } = req.body;
  console.log('unfriend',friendId,userId);

  try {
    const result1 = await userModel.updateOne(
      { _id: userId },
      { $pull: { friends:friendId } }
    );
    

    const result2 = await userModel.updateOne(
      { _id: friendId },
      { $pull: { friends: userId } }
    );

    if (result1.modifiedCount > 0) {
      res.status(200).json({
        message: `Friend with ID removed successfully.`,
        status: true,
      });
    } else {
      console.log(`No matching friend found to remove.`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const recommendedFriends=async (req: Request,res:Response)=>{
  const{userId}=req.body
  console.log('recommendedFriends',userId);
  try{
    const user = await userModel.findById(userId);
    if (!user) {
       res.status(404).json({ message: "User not found" });
    }else{
      const userFriends = user?.friends; // Assuming `friends` is an array of friend IDs
      if (!userFriends || userFriends.length === 0) {
        res.status(200).json({ mutualFriends: [] });
      }else{
        const mutualFriendsSet = new Set<string>(); // To avoid duplicates
  
      // Find mutual friends
      if(userFriends){
        for (const friendId of userFriends) {
          const friend = await userModel.findById(friendId).select("friends");
    
          if (friend && friend.friends) {
            friend.friends.forEach((friendOfFriendId: string) => {
              // Add to mutual friends if the person is not the user and is not already their friend
              if (friendOfFriendId !== userId && !userFriends.includes(friendOfFriendId)) {
                mutualFriendsSet.add(friendOfFriendId);
              }
            });
          }
        }
      }
      // Convert the Set to an Array
      const mutualFriends = Array.from(mutualFriendsSet);
  
      res.status(200).json({ mutualFriends: mutualFriends });
    }

      }
      
   

  }catch(error){
    console.error("Error fetching recommended friends:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


