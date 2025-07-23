import { Link } from "react-router-dom"

const HomeView = () => {
    return (
        <div className="flex flex-col items-center p-10">
            <Link className="bg-amber-500 text-gray-600 py-1 px-2 rounded-lg font-bold hover:opacity-80 ring-amber-300 ring-1" to='/team/2'>Team go</Link>
        </div>

    )
}

export default HomeView