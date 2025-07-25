interface Props {
    pseudo: string;
    earningsSum: number;
    percentage: number;
}

const Details = ({ pseudo, earningsSum, percentage }: Props) => {
    return (
        <div className="flex flex-col justify-center p-10 bg-gray-800 w-[20rem] h-[12rem] rounded-2xl">
            <h1 className='text-amber-300 font-bold text-3xl mb-10 mt-5'>{pseudo}</h1>
            <div className='text-lg mb-4'>Coins : {earningsSum} 🪙</div>
            <div className='text-lg mb-4'>Contribution : {percentage}%</div>
        </div>
    )
}

export default Details