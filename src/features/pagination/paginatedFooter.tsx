import { Pagination, Navbar } from "react-bootstrap";

interface PaginatedFooterProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (index: number) => void;
}

export const PaginatedFooter = ({ totalPages, currentPage, onPageChange }: PaginatedFooterProps) => {
  const pageSize = 10; // Number of pages to display at a time
  const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Calculate the current range of pages to display
  const startIndex = Math.max(currentPage - Math.floor(pageSize / 2), 1);
  const endIndex = Math.min(startIndex + pageSize - 1, totalPages);

  const pageItems = totalPagesArray
    .slice(startIndex - 1, endIndex)
    .map((pageNumber) => (
      <Pagination.Item
        key={pageNumber}
        active={pageNumber === currentPage}
        onClick={() => onPageChange(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>
    ));
  
  return (
    <Navbar
      fixed="bottom"
      style={{ display: "flex", justifyContent: "center", paddingTop: "15px", paddingBottom: "1px", backgroundColor: "lightgray" }}
      className="shadow-sm"
      data-bs-theme="light"
    >
      <Pagination>
      <Pagination.First
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      />
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pageItems}
        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
      </Pagination>
    </Navbar>
  );
};
