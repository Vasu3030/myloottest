import { Link } from 'react-router-dom';
import { ArrowTopRightOnSquareIcon, UsersIcon } from '@heroicons/react/24/solid';

interface Props {
    id: number;
    name: string;
    totalCoins: number;
    activeUsers: number;
}

const TeamSection = ({ id, name, totalCoins, activeUsers }: Props) => {
    return (
        // Link to the team view with the team ID
        <Link
            to={`/team/${id}`}
            className="flex flex-col justify-center p-10 bg-gray-800 w-[20rem] h-[12rem] rounded-2xl hover:ring-2 hover:ring-amber-200 cursor-pointer  hover:text-amber-200">
            <div className='flex flex-row justify-between items-center mb-4 text-amber-300'>
                <h1 className='font-bold text-3xl mb-10 mt-5'>{name}</h1>
                <ArrowTopRightOnSquareIcon className="h-6 w-6" />
            </div>
            <div className='text-lg mb-4'>Total Coins : {totalCoins} 🪙</div>
            <div className='flex flex-row items-center gap-1 text-lg mb-4'>Members : {activeUsers} <UsersIcon className="h-5 w-5" /></div>
        </Link>
    )
}

export default TeamSection