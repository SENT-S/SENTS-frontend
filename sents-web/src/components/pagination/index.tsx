// Pagination.js
import React, { useState } from 'react';
import {
  Pagination as PaginationContainer,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  items: any[];
  itemsPerPage: number;
  render: (items: any[]) => JSX.Element;
}

const Pagination = ({ items = [], itemsPerPage, render }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem) || [];

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {render(currentItems)}
      <PaginationContainer className="w-full flex justify-end p-2">
        <PaginationPrevious
          className="cursor-pointer"
          onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
          isActive={currentPage !== 1}
        />
        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i} className="list-none cursor-pointer">
            <PaginationLink
              onClick={() => handlePageClick(i + 1)}
              isActive={i + 1 === currentPage}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationNext
          className="cursor-pointer"
          onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages))}
          isActive={currentPage !== totalPages}
        />
      </PaginationContainer>
    </div>
  );
};

export default Pagination;
