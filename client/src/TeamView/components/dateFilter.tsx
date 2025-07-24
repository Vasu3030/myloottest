import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    setDateFilter: React.Dispatch<React.SetStateAction<string>>;
}

const DateFilter = ({ setDateFilter }: Props) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);

    const applyFilter = () => {
        if (!startDate || !endDate || (endDate < startDate)) {
            setDateFilter("");
            setError("Dates invalides")
            return;
        }

        // Convert to pass it in url
        const from = startDate.toISOString().split("T")[0];
        const to = endDate.toISOString().split("T")[0];
        setError(null)
        setDateFilter(`from=${from}&to=${to}`);
    };

    const clearFilter = () => {
        setError(null)
        setDateFilter("");
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-2">
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex gap-1">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="From"
                    className="border p-2 rounded w-[7rem] text-center"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="To"
                    className="border p-2 rounded w-[7rem] text-center"
                />
            </div>

            {/* Apply and clear filter */}
            <div className="flex gap-1">
                <button
                    onClick={applyFilter}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"
                >
                    Apply
                </button>
                <button
                    onClick={clearFilter}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default DateFilter;
