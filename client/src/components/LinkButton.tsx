import { Link } from "react-router-dom";

interface Props {
    to: string;
    label: string;
}

const LinkButton = ({ to, label }: Props) => {
    return (
        <Link
            to={to}
            className=" top-4 left-4 px-3 py-2 rounded-lg font-bold bg-gray-700 text-white hover:bg-gray-600 shadow-md transition w-full"
        >
            {label}
        </Link>
    );
};

export default LinkButton;
