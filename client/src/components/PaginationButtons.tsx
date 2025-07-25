import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function PaginationButtons({ page, totalPages, onPageChange }: Props) {

  // Handle previous and next page changes
  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  // Render page numbers with ellipsis ("...") for large page sets
  const renderPageNumbers = () => {
    const pages = [];

    // Loop through all possible page numbers
    for (let i = 1; i <= totalPages; i++) {
      // Show first, last, and pages around the current page (next and previous)
      if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
        // Add the page number button
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset cursor-pointer ${i === page ? 'bg-gray-600 text-white' : 'hover:bg-gray-500'
              }`}
          >
            {i}
          </button>
        );

        // Show ellipsis ("...") when there is a gap of 2 pages
        // Example: page 1 ... 4 5 6 ... 10
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

    // Return the array of page buttons + ellipsis
    return pages;
  };

  return (
    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
      {/* Previous button */}
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      
      {/* Render page numbers */}
      {renderPageNumbers()}

      {/* Next button */}
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
