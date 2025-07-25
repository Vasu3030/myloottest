interface Props {
    name: string;
    totalCoins: number;
}

const TeamHeader = ({ name, totalCoins }: Props) => {
    return (
        <div className="flex flex-col justify-center items-center gap-1">
            <h1 className='text-amber-300 font-bold text-3xl'>{name}</h1>
            <p className='text-gray-400'>Total Coins: {totalCoins} 🪙</p>
        </div>
    )
}

export default TeamHeader