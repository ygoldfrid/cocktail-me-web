import React from "react";
import _ from "lodash";
import { countPages } from "../../utils/paginate";

function Pagination({ itemsCount, pageSize, currentPage, onPageChange }) {
  const pagesCount = countPages(itemsCount, pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  const getPreviousClasses = () => {
    return currentPage === 1 ? "page-item disabled" : "page-item";
  };

  const getNextClasses = () => {
    return currentPage === pagesCount ? "page-item disabled" : "page-item";
  };

  return (
    <div className="row justify-content-center">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={getPreviousClasses()}>
            <button
              className="page-link"
              onClick={() => onPageChange("previous")}
            >
              <i class="fa fa-chevron-left" aria-hidden="true" />
            </button>
          </li>
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}
          <li className={getNextClasses()}>
            <button className="page-link" onClick={() => onPageChange("next")}>
              <i class="fa fa-chevron-right" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
