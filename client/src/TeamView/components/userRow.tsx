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
            className="flex flex-row justify-between items-center w-[20rem] lg:w-[34rem] h-[3rem] text-gray-900 mb-2 px-2 rounded-lg hover:ring-2 hover:ring-amber-200 cursor-pointer"
            >
            <div className='font-bold text-lg'>{icon}{data.pseudo}</div>
            <div className='flex flex-col text-xs justify-center items-center'>
                <div>Coins : {data.amount}</div>
                <div>Contribution : {data.percentage}%</div>
            </div>
        </div>
    )
}

export default UserRow;
