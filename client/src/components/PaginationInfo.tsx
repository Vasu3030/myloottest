interface PaginationInfoProps {
  startItem: number;
  endItem: number;
  totalItems: number;
}

export default function PaginationInfo({ startItem, endItem, totalItems }: PaginationInfoProps) {
  return (
    <p className="text-sm">
      Showing <span className="font-bold">{startItem}</span> to{' '}
      <span className="font-bold">{endItem}</span> of{' '}
      <span className="font-bold">{totalItems}</span> items
    </p>
  );
}
