import { Link, useParams } from "react-router-dom"

const TeamView = () => {
    const params = useParams();
    return (
        <div>
            <p className="font-bold text-3xl">{params.teamId}</p>
            <Link to='/'>Home</Link>
        </div>

    )
}

export default TeamView