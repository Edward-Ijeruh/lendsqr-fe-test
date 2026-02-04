import React from "react";
import pageLeft from "../../../assets/icons/users-page/page-right.png";
import pageRight from "../../../assets/icons/users-page/page-left.png";
import upNext from "../../../assets/icons/users-page/np-next.png";
import "./Pagination.scss";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalRecords: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalRecords,
}) => {
  const totalPages = Math.ceil(totalRecords / pageSize);
  const pageSizes = [10, 20, 50, 100].filter((s) => s <= totalRecords);

  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);
    if (left > 2) range.push("…");

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) range.push("…");
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-wrapper">
      <div className="pagination-left">
        <span>Showing</span>
        <div className="select-wrapper" onClick={() => {}}>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <img src={upNext} alt="dropdown arrow" />
        </div>
        <span>out of {totalRecords}</span>
      </div>

      <div className="pagination-right">
        <div className="page-box">
          <div className="arrow-box">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <img src={pageLeft} alt="previous" />
            </button>
          </div>

          {pageNumbers.map((num, idx) =>
            num === "…" ? (
              <span key={`ellipsis-${idx}`} className="ellipsis">
                …
              </span>
            ) : (
              <button
                key={num}
                className={`page-number ${num === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(Number(num))}
              >
                {num}
              </button>
            ),
          )}

          <div className="arrow-box">
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <img src={pageRight} alt="next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
