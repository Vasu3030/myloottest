import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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

    // Handle previous and next page actions
    const handlePrev = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    // Handle page size change
    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onPageSizeChange(Number(e.target.value));
    };


    const renderPageNumbers = () => {
        const pages = [];

        // Loop through all pages from 1 to totalPages
        for (let i = 1; i <= totalPages; i++) {

            // Show page button if:
            // - It's the first page
            // - It's the last page
            // - It's the current page OR one page before/after the current page
            if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0 cursor-pointer ${i === page
                                ? 'z-10 bg-gray-600 text-white focus-visible:outline-indigo-600' // Highlight current page
                                : 'hover:bg-gray-500' // Hover effect for other pages
                            }`}
                    >
                        {i}
                    </button>
                );
            }

            // Show "..." (ellipsis) when there is a gap between the current visible pages
            // Example: page 1 ... 4 5 6 ... 10
            else if (i === page - 2 || i === page + 2) {
                pages.push(
                    <span
                        key={`ellipsis-${i}`}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0 cursor-pointer"
                    >
                        ...
                    </span>
                );
            }
        }

        // Return the array of page buttons and ellipsis
        return pages;
    };


    return (
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex flex-col justify-center items-center gap-2">
                {/* Pagination buttons + Select pageSize */}
                <div className='flex flex-col lg:flex-row justify-between items-center gap-1 w-[20rem] lg:w-[34rem]'>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        >
                            <span className="sr-only">Previous</span>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>

                        {renderPageNumbers()}

                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        >
                            <span className="sr-only">Next</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </nav>
                    <select
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        className="rounded text-sm border-1 border-white py-1 px-2 cursor-pointer"
                    >
                        {[5, 10, 15, 20].map(size => (
                            <option key={size} value={size}>
                                {size} items per page
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <p className="text-sm">
                        Showing <span className="font-bold">{startItem}</span> to{' '}
                        <span className="font-bold">{endItem}</span> of{' '}
                        <span className="font-bold">{totalItems}</span> items
                    </p>

                </div>
            </div>
        </div>
    );
}
