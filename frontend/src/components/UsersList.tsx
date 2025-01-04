import  { useEffect, useState } from "react";
import axios from "axios";
import { FormData } from "./SignupForm/type";
import User from "./User";

export interface User extends FormData {_id:string}

const UsersList = () => {
    
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [users, setUsers] = useState<User|[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(BASE_URL+"/users?term="+searchTerm);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, [searchTerm]);

//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

console.log(users)
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Users</h2>
      <input
        type="text"
        placeholder="Search friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-2 p-2 w-full border rounded"
      />
      <ul className="mt-4 space-y-2 p-2">
       
        {users.map((user:User) => (
          <User user={user}/>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
