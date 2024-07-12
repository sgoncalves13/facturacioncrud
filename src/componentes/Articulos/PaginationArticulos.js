import React from 'react';
import '../../CSS/PaginationArticulos.css';

const PaginationArticulos = ({ totalPages, currentPage, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} className='PaginationArtButton'>
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => handleClick(index + 1)}
          className={currentPage === index + 1 ? 'active' : 'PaginationArtButton'}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages} className='PaginationArtButton'>
        Next
      </button>
    </div>
  );
};

export default PaginationArticulos;
