import './style.css';

const Pagination = () => {
  return (
    <div className="pagination-wrapper">
      <button className="prev-next-btn">Prev</button>

      <div className="page-button-wrapper">
        <button className="pagin-btn">1</button>
        <button className="pagin-btn">2</button>
        <button className="pagin-btn">3</button>
        <span className="more">...</span>
      </div>

      <button className="prev-next-btn">Next</button>
    </div>
  );
}

export default Pagination;