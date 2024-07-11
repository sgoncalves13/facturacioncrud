import React from 'react';
import '../../CSS/PaginationFactura.css';

const PaginationFacturas = ({ totalPages, currentPage, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const startIndex = Math.floor((currentPage - 1) / 5) * 5;
  const endIndex = Math.min(startIndex + 4, totalPages - 1);

  const pageIndicesToShow = Array.from({ length: endIndex - startIndex + 1 }, (_, index) => startIndex + index);

  return (
    <div className="paginationFacturas">
      <button onClick={() => handleClick(1)} disabled={currentPage === 1} className='ButtonFirstPag'>
        Primera
      </button>
      <button  className={currentPage === 1 ? 'pagination__arrow pagination__arrow--disabled' : 'pagination__arrow'} onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
        <span className="pagination__arrow-half"></span>
        <span className="pagination__arrow-half"></span>
      </button>
      {pageIndicesToShow.map((pageIndex) => (
        <div className="pagination__item" key={pageIndex}>
        <button
          className={currentPage === pageIndex + 1 ? 'pagination__number--active' : 'pagination__number'}
          onClick={() => handleClick(pageIndex + 1)}
        >
          {pageIndex + 1}
        </button>
        <span className="pagination__number-indicator"></span>
      </div>
      ))}
      <button className={currentPage === totalPages ? 'pagination__arrow pagination__arrow--right pagination__arrow--disabled' : 'pagination__arrow pagination__arrow--right'} onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
      <span className="pagination__arrow-half"></span>
      <span className="pagination__arrow-half"></span>
      </button>
      <button onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages} className='ButtonUltPag'>
        Última
      </button>
    </div>
  );
};

export default PaginationFacturas;
