interface Props {
  onClick: () => void;
  label: string;
  className?: string;
}

const FormButton = ({ onClick, label, className }: Props) => (
  <button
    onClick={onClick}
    className={className ?? "bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"}
  >
    {label}
  </button>
);

export default FormButton;