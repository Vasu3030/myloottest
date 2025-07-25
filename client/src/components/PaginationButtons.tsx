import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationButtonsProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function PaginationButtons({ page, totalPages, onPageChange }: PaginationButtonsProps) {
  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset cursor-pointer ${
              i === page ? 'bg-gray-600 text-white' : 'hover:bg-gray-500'
            }`}
          >
            {i}
          </button>
        );
      } else if (i === page - 2 || i === page + 2) {
        pages.push(
          <span
            key={`ellipsis-${i}`}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset"
          >
            ...
          </span>
        );
      }
    }

    return pages;
  };

  return (
    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      {renderPageNumbers()}

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </nav>
  );
}
