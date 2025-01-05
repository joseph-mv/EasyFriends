import { User as UserDetails } from "./UsersList";
import { Plus } from "lucide-react";
import { axiosInstance } from "../api/axiosInstance";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { acceptRequest, cancelRequest, declineRequest, removeFriend, sendRequest } from "../redux/reducers/userReducer";
import { getRelationshipStatus } from "../utils";

const User = ({ user }: { user: UserDetails }) => {
  const token = localStorage.getItem("token");
  const loggedUser = useAppSelector((store) => store.user.user);
  const loggedUserId = loggedUser?._id;
  const dispatch = useAppDispatch();

  const sendFriendRequest = async () => {
    try {
      const response = await axiosInstance.post(
        "/friend_request",
        {
          senderId: loggedUserId,
          receiverId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
      if (response.data.status) {
        dispatch(sendRequest(user._id));
      }
      alert(response.data.message);
    } catch (error: any) {
      console.error("Error sending friend request:", error);
      alert(error.response?.data?.message || "Failed to send friend request");
    }
  };
  const cancelFriendRequest = async () => {
    try {
      const response = await axiosInstance.post(
        "/cancel_request",
        {
          senderId: loggedUserId,
          receiverId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
      if (response.data.status) {
        dispatch(cancelRequest(user._id));
      }
      alert(response.data.message);
    } catch (error: any) {
      console.error("Error sending friend request:", error);
      alert(error.response?.data?.message || "Failed to cancel friend request");
    }
  };
  const declineFriendRequest = async () => {
    try {
      const response = await axiosInstance.post(
        "/decline_request",
        {
          receiverId: loggedUserId,
          senderId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
      console.log(response)
      if (response.data.status) {

        dispatch(declineRequest(user._id));
      }
      alert(response.data.message);
    } catch (error: any) {
      console.error("Error sending friend request:", error);
      alert(error.response?.data?.message || "Failed to cancel friend request");
    }
  };
  const acceptFriendRequest = async () => {
    try {
      const response = await axiosInstance.post(
        "/accept_request",
        {
          receiverId: loggedUserId,
          senderId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
      console.log(response)
      if (response.data.status) {

        dispatch(declineRequest(user._id));
        dispatch(acceptRequest(user._id));
      }
      alert(response.data.message);
    } catch (error: any) {
      console.error("Error sending friend request:", error);
      alert(error.response?.data?.message || "Failed to cancel friend request");
    }
  };
  const unfriend=async ()=>{
    try {
      const response = await axiosInstance.post(
        "/unfriend",
        {
         userId: loggedUserId,
          friendId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
      console.log(response)
      if (response.data.status) {

        dispatch(removeFriend(user._id));
       
      }
      alert(response.data.message);
    } catch (error: any) {
      console.error("Error sending friend request:", error);
      alert(error.response?.data?.message || "Failed to cancel friend request");
    }
  }

  const relation = getRelationshipStatus(user._id, {
    friends: loggedUser?.friends,
    getRequests: loggedUser?.getRequests,
    sendRequests: loggedUser?.sendRequests,
  });

  return (
    <div
      key={user._id}
      className="relative bg-gray-500 flex items-center p-4 border rounded shadow-sm  h-16 overflow-hidden"
    >
      <img
        src={user.image || "/placeholder-user.png"}
        alt={user.firstName}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <h3 className="font-bold">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-sm text-black">{user.email}</p>
        <p className="text-sm text-black">Hobbies: {user.hobbies.join(", ")}</p>
        <p className="text-sm text-black">
          {/* Friends: {user.friendsCount} */}
        </p>
      </div>
      {relation === "No Relationship" ? (
  <button
    onClick={sendFriendRequest}
    className="absolute right-4 px-4  w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-all duration-300"
    aria-label="Send Friend Request"
  >
    <Plus className="text-white" />
  </button>
) : relation === "Friends" ? (
  <button
    onClick={unfriend}
    className="absolute right-4 px-4  py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
    aria-label="Unfriend"
  >
    Unfriend
  </button>
) : relation === "Request Sent" ? (
  <button
    onClick={cancelFriendRequest}
    className="absolute right-4 px-4   py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-all duration-300"
    aria-label="Cancel Friend Request"
  >
    Cancel Request
  </button>
) : (
  <div className="absolute right-4 space-x-2" >
   <button
    onClick={acceptFriendRequest}
    className=" px-4   py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
    aria-label="Accept Friend Request"
  >
    Accept
  </button>

  <button
    onClick={declineFriendRequest}
    className="px-4  py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
    aria-label="Accept Friend Request"
  >
    Decline
  </button>
  </div>
 

 
  
)}

    </div>
  );
};

export default User;
