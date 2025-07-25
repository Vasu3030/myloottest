interface Props {
  pageSize: number;
  onPageSizeChange: (newPageSize: number) => void;
}

export default function PaginationSelect({ pageSize, onPageSizeChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(e.target.value));
  };

  return (
    <select
      value={pageSize}
      onChange={handleChange}
      className="rounded text-sm border-1 border-white py-1 px-2 cursor-pointer"
    >
      {[5, 10, 15, 20].map(size => (
        <option key={size} value={size}>
          {size} items per page
        </option>
      ))}
    </select>
  );
}
