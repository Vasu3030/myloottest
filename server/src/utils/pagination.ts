export function buildPagination(page: number, pageSize: number, startIndex = 0) {
  // offset is used to calculate the starting point for the pagination
  const offset = (page - 1) * pageSize;

  // Validate page and pageSize to ensure they are positive integers
  if (isNaN(pageSize) || isNaN(offset) || pageSize <= 0 || page <= 0) {
    return {
      params: [],
      paginationCondition: '',
      page: 1,
      pageSize: 0,
    };
  }

  // Return params with pagination condition
  // The condition is used in SQL queries to limit the results returned
  return {
    params: [pageSize, offset],
    paginationCondition: `LIMIT $${startIndex + 1} OFFSET $${startIndex + 2}`,
    page,
    pageSize,
  };
}
