import { User as UserDetails } from "./UsersList";
import { Plus } from "lucide-react";
import { axiosInstance } from "../api/axiosInstance";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { cancelRequest, sendRequest } from "../redux/reducers/userReducer";
import { getRelationshipStatus } from "../utils";

const User = ({ user }: { user: UserDetails }) => {
  const token = localStorage.getItem("token");
  const sender = useAppSelector((store) => store.user.user);
  const senderId = sender?._id;
  const dispatch = useAppDispatch();

  const sendFriendRequest = async () => {
    try {
      const response = await axiosInstance.post(
        "/friend_request",
        {
          senderId: senderId,
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
          senderId: senderId,
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

  const relation = getRelationshipStatus(user._id, {
    friends: sender?.friends,
    getRequests: sender?.getRequests,
    sendRequests: sender?.sendRequests,
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
    // onClick={unfriend}
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
  <button
    // onClick={acceptRequest}
    className="absolute right-4 px-4   py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
    aria-label="Accept Friend Request"
  >
    Accept
  </button>
)}

    </div>
  );
};

export default User;
