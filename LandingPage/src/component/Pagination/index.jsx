import React from 'react';
import './style.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    const pageRange = 2;

    for (let i = 1; i <= totalPages; i++) {
        if (
            i <= pageRange ||
            i >= totalPages - pageRange + 1 ||
            (i >= currentPage - pageRange && i <= currentPage + pageRange)
        ) {
            pageNumbers.push(i);
        }
    }

    const handlePageChange = (page) => {
        if (page !== currentPage && page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                &lt;
            </button>

            {pageNumbers.map((number, index) =>
                number === '...' ? (
                    <span key={index}>...</span>
                ) : (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={number === currentPage ? 'active' : ''}
                    >
                        {number}
                    </button>
                )
            )}

            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                &gt;
            </button>
        </div>
    );
};

export default Pagination;