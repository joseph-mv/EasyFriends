import { User2Icon } from "lucide-react";
// import { FormData } from "./SignupForm/type";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { clearUser } from "../redux/reducers/userReducer";

const UserProfile = () => {
const [isAuthenticated,setIsAuthenticated]=useState(false)
  // const token = localStorage.getItem("token");
const user=useAppSelector(store=>store.user.user)
const dispatch=useAppDispatch()
console.log(user)
  const handleLogout=()=>{
    localStorage.removeItem('token')
    dispatch(clearUser())
    setIsAuthenticated(!isAuthenticated)
  }
  return user ? (
    <div className="relative max-w-7xl flex mt-4 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* User Image */}
      <div className="relative">
        {/* { user.image?
          <img
            src={user.image}
            alt={user.firstName}
            className="w-full h-48 object-cover"
          />: */}
          <User2Icon className="h-44 w-44 text-gray-500" />
        {/* } */}
        
      </div>

      {/* User Details */}
      <div className="p-6">
        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-800">{user?.firstName}</h2>

        {/* Email */}
        <p className="text-gray-600 mt-1">{user?.email}</p>

        {/* Hobbies */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Hobbies:</h3>
          <ul className=" flex list-disc pl-5 text-gray-600">
            {user?.hobbies.length > 0 ? (
              user?.hobbies.map((hobby, index) => (
                <li key={index} className="mt-1">
                  {hobby}
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No hobbies listed</li>
            )}
          </ul>
        </div>

        {/* Number of Friends */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Number of Friends:
          </h3>
          <p className="text-indigo-600 text-xl font-bold">
            {/* {user?.numberOfFriends} */}
          </p>
        </div>
      </div>

      <button onClick={handleLogout}  className=" absolute top-2 right-2 rounded-md p-1 px-2 bg-blue-600 hover:bg-blue-400">Logout</button>
    </div>
  ) : (
    ""
  );
};

export default UserProfile;
