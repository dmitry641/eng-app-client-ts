import { useState } from "react";

export function usePagination<T>(data: T[], itemsPerPage: number = 3) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    const result = data.slice(begin, end);

    if (result.length === 0) {
      // спорный момент
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }

    return result;
  };

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  };

  return { jump, currentData, currentPage, maxPage };
}
