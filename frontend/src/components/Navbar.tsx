
import { Users, Bell, MessageCircle, UserCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setUser } from "../redux/reducers/userReducer";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const userId=useAppSelector(store=>store.user.user?._id)
  const getUserData = async () => {
    try {
      const response = await axiosInstance.get("/get_user?id="+userId, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });
      console.log(response.data)
      if (response.data) {
        dispatch(setUser(response.data));
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      // alert(error.message);
      
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">EasyFriends</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              to="/notifications"
              className="p-2 text-gray-600 hover:text-blue-600 relative"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Link>
            <Link to="/chat" className="p-2 text-gray-600 hover:text-blue-600">
              <MessageCircle className="h-6 w-6" />
            </Link>
            <Link
              to="/authorization"
              className="p-2 text-gray-600 hover:text-blue-600"
            >
              <UserCircle className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
