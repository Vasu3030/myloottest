import { Link } from 'react-router-dom';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

interface Props {
    id: number;
    name: string;
}

const TeamSection = ({ id, name }: Props) => {
    return (
        <Link
            to={`/team/${id}`}
            className="flex flex-row justify-around items-center p-10 bg-gray-800 w-[20rem] h-[8rem] rounded-2xl hover:ring-2 hover:ring-amber-200 cursor-pointer text-amber-300 hover:text-amber-200">
            <h1 className='font-bold text-3xl'>{name}</h1>
            <ArrowTopRightOnSquareIcon className="h-6 w-6" />
        </Link>
    )
}

export default TeamSection