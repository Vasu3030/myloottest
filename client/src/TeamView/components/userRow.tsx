import { type User } from '../../services/team'
import { Link } from 'react-router-dom';

interface Props {
    data: User;
    bgColor: string;
    icon: string;
    rank: number;
}

const UserRow = ({ data, bgColor, icon, rank }: Props) => {
    return (
        // Link to user's profile page
        <Link to={`/user/${data.userId}`}>
            <div
                style={{ backgroundColor: bgColor }}
                className="flex flex-row justify-between items-center w-[20rem] lg:w-[34rem] h-[3rem] text-gray-900 mb-2 px-2 rounded-lg hover:ring-2 hover:ring-amber-200 cursor-pointer"
            >
                {/* Display icon if rank is 1, 2, or 3, otherwise show the rank number */}
                <div className='font-bold text-lg'>{rank > 3 && `${rank} -`} {icon} {data.pseudo}</div>
                <div className='flex flex-col text-xs justify-center items-center'>
                    <div>Coins : {data.amount} 🪙</div>
                    <div>Contribution : {data.percentage}%</div>
                </div>
            </div>
        </Link>
    )
}

export default UserRow;
