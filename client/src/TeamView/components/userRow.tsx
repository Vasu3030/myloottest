import { type User } from '../../services/team'

interface Props {
    data: User;
    bgColor: string;
    icon: string;
}

const UserRow = ({ data, bgColor, icon }: Props) => {
    return (
            <div 
                style={{ backgroundColor: bgColor }}
                className="flex flex-row justify-between items-center w-[20rem] lg:w-[34rem] h-[3rem] text-gray-900 mb-2 px-2 rounded-lg hover:ring-2 hover:ring-amber-200 cursor-pointer">
                <span className='font-bold text-lg'>{icon}{data.pseudo}</span>
                <div className='flex flex-col text-xs'>
                    <p>Coins : {data.amount}</p>
                    <p>Contribution : {data.percentage}%</p>
                </div>
            </div>
    )
}

export default UserRow;
