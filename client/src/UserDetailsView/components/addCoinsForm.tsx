import { useAddCoins } from "../../hooks/userHooks";
import FormButton from "../../components/FormButton";

interface AddCoinsFormProps {
    userId: number;
    teamId: number;
    amount: number;
    setAmount: (amount: number) => void;
}

const AddCoinsForm = ({ userId, teamId, amount, setAmount }: AddCoinsFormProps) => {
    const { addCoins, success, error } = useAddCoins();

    // Handle click event to add coins
    // If amount is greater than 0, call addCoins function and reset amount to 0
    const handleClick = async () => {
        if (amount > 0) {
            await addCoins(userId, teamId, amount);
            setAmount(0);
        }
    };

    return (
        <div className="flex flex-col gap-2 mt-6 justify-center items-center">
            <div className="flex flex-row gap-2 items-center">
                {/* Input field to enter amount of coins to add minimum 1 */}
                <input
                    id="amount"
                    type="number"
                    min={1}
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    className="border rounded px-2 py-1 w-[6rem] text-gray-700"
                    required
                />
                {/* Button to add coins */}
                <FormButton
                    onClick={handleClick}
                    label="Add Coins" />
            </div>
            {/* Display success or error message */}
            {error && <span className="text-red-500">{error}</span>}
            {success && <span className="text-green-500">{success}</span>}
        </div>
    );
};

export default AddCoinsForm;