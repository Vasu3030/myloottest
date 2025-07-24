import { Link } from 'react-router-dom';
import { type Team } from '../../services/team'

interface Props {
    data: Team;
    bgColor: string;
    icon: string;
}

const TeamRow = ({ data, bgColor, icon }: Props) => {
    return (
        <Link to={`/team/${data.id}`}>
            <div 
                style={{ backgroundColor: bgColor }}
                className={`flex flex-row justify-between items-center w-[20rem] lg:w-[34rem] h-[3rem] text-gray-900 mb-2 px-2 rounded-lg hover:ring-2 hover:ring-amber-200`}>
                <span className='font-bold text-lg'>{icon}{data.name}</span>
                <div className='flex flex-col text-xs'>
                    <p>Coins : {data.totalCoins}</p>
                    <p>Members : {data.activeUsers}</p>
                </div>
            </div>
        </Link>
    )
}

export default TeamRow;
