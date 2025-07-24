import { Link } from "react-router-dom";

interface Props {
    to: string;
    label: string;
}

const LinkButton = ({ to, label }: Props) => {
    return (
        <Link
            to={to}
            className="fixed top-4 left-4 flex items-center px-3 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 shadow-md transition"
        >
            {label}
        </Link>
    );
};

export default LinkButton;
