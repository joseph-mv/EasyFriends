import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { useAppSelector } from "../redux/store"
import User from "./User";





const Recommended = () => {
    const user=useAppSelector(store=>store.user.user)
    const token=localStorage.getItem('token');
    const userId=user?._id
    const friends=user?.friends
   
    const [recommended,setRecommended] = useState([])
    const getRecommended=async()=>{
     try {
          const response = await axiosInstance.post(
            "/recommended",
            {
             userId,
              friends: friends,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Add the token to the Authorization header
              },
            }
          );
          console.log(response)
          if (response.data.status) {
            setRecommended(response.data)
           
          }
          alert(response.data.message);
        } catch (error) {
          console.error("Error get recommendations:", error);
        //   alert(error.response?.data?.message || "Failed to get recommendations");
        }}

        useEffect(() => {
        getRecommended()
        }, [])
        
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Recommended</h2>
     
      <ul className="mt-4 space-y-2 p-2">
       
        {recommended.map((user) => (
        
            <User user={user} />
          
        ))}
      </ul>
    </div>
  )
}

export default Recommended