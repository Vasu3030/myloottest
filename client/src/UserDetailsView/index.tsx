import { useParams } from "react-router-dom"

const UserDetailsView = () => {
    const params = useParams();
    
  return (
    <div>UserDetailsView{params.userId}</div>
  )
}

export default UserDetailsView