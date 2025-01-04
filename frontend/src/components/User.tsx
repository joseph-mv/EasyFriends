
import { User as UserDetails } from './UsersList'
import {Plus} from 'lucide-react'

const User = ({user}:{user:UserDetails}) => {
  return (
    <div 
          key={user._id}
          className= "relative bg-gray-500 flex items-center p-4 border rounded shadow-sm  h-16 overflow-hidden"
        >
          <img
            src={user.image || "/placeholder-user.png"}
            alt={user.firstName}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className="font-bold">{user.firstName} {user.lastName}</h3>
            <p className="text-sm text-black">{user.email}</p>
            <p className="text-sm text-black">
              Hobbies: {user.hobbies.join(", ")}
            </p>
            <p className="text-sm text-black">
              {/* Friends: {user.friendsCount} */}
            </p>
          </div>
          <button className='absolute right-4 w-8 h-8 bg-green-600  rounded-full'><Plus className='m-auto'/></button>
        </div>
  )
}

export default User