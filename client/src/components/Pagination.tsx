import PaginationButtons from './PaginationButtons';
import PageSizeSelector from './PaginationSelect';
import PaginationInfo from './PaginationInfo';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange
}: PaginationProps) {
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-col items-center gap-2 px-4 py-3 sm:px-6">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-1 w-[20rem] lg:w-[34rem]">
        <PaginationButtons page={page} totalPages={totalPages} onPageChange={onPageChange} />
        <PageSizeSelector pageSize={pageSize} onPageSizeChange={onPageSizeChange} onPageChange={onPageChange}/>
      </div>
      <PaginationInfo startItem={startItem} endItem={endItem} totalItems={totalItems} />
    </div>
  );
}
