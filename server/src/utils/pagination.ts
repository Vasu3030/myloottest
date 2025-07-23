export function buildPagination(page: number, pageSize: number, startIndex = 0) {
  const offset = (page - 1) * pageSize;

  // Si page ou pageSize invalides → pas de pagination
  if (isNaN(pageSize) || isNaN(offset) || pageSize <= 0 || page <= 0) {
    return {
      params: [],
      paginationCondition: '',
      page: 1,
      pageSize: 0,
    };
  }

  return {
    params: [pageSize, offset],
    paginationCondition: `LIMIT $${startIndex + 1} OFFSET $${startIndex + 2}`,
    page,
    pageSize,
  };
}
