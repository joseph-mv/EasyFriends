import Navbar from "../components/Navbar"
import Recommended from "../components/Recommended"
import UserProfile from "../components/UserProfile"
import UsersList from "../components/UsersList"


const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <UserProfile/>
        <UsersList/>
        <Recommended/>
      

    </div>
  )
}

export default HomePage