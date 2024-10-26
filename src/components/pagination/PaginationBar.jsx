import React from 'react'
import '../../App.css';

const PaginationBar = ({ totalPages, currentPage, setCurrentPage }) => {

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }


    const goToPrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    const goToPage = (page) => {
        setCurrentPage(page);
    }

    const renderPageNumbers = () => {
        const pages = [];
        if (currentPage > 3) {
            pages.push(
                <button key={1} onClick={() => goToPage(1)} className='pagination-btn'>
                    1
                </button>
            );
            pages.push(<span key={"ellipsis1"} className='pagination-span'>...</span>);
        }

        for (let i = Math.max(currentPage - 2, 1); i <= Math.min(totalPages, currentPage + 2); i++) {
            pages.push(
                <button onClick={() => goToPage(i)} key={i} className={`pagination-btn ${i === currentPage ? 'active' : ''}`}>
                    {i}
                </button>
            );
        }
        if (currentPage < totalPages - 2) {
            pages.push(<span key="ellipsis2" className='pagination-span'>...</span>); // Ellipsis for skipped pages
            pages.push(
                <button key={totalPages} onClick={() => goToPage(totalPages)} className='pagination-btn'>
                    {totalPages}
                </button>
            );
        }
        return pages;
    }

    return (
        <>
            <div className="pagination">
                <button className='pagination-btn' disabled={currentPage === 1} onClick={goToPrevPage}>
                    &lt;
                </button>
                {renderPageNumbers()}
                <button className="pagination-btn" disabled={currentPage === totalPages} onClick={goToNextPage}>
                    &gt;
                </button>
            </div>
        </>
    )
}

export default PaginationBar