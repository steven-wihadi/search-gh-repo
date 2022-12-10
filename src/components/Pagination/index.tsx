import { useMemo } from 'react';
import './style.css';

interface PropsType {
  totalPages: number;
  activePage: number;
  onChange?: (pageClicked: number) => void;
}

const Pagination = (props: PropsType) => {
  const {totalPages, activePage, onChange} = props;

  const paginOrder = useMemo(() => {
    return renderPagination();
  }, [totalPages, activePage]);

  function renderPagination() {
    const resultPages = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i += 1) {
        if (resultPages.length !== 3) {
          resultPages.push({ page: i, id: i });
        }
      }
    } else {
      const firstPage  = (activePage === 1 || activePage === totalPages) ? 1 : activePage - 1;
      const secondPage = (activePage === 1 || activePage === totalPages) ? firstPage + 1 : activePage;
      const thirdPage  = activePage === totalPages ? totalPages : secondPage + 1
      
      resultPages[0] = { page: firstPage,   id: 1 };
      resultPages[1] = { page: secondPage,  id: 2 };
      resultPages[2] = { page: thirdPage,   id: 3 };
    }
    
    return resultPages;
  }

  const onCLickPrevNext = (prevOrNext: 'prev' | 'next' ) => {
    const isNotFirst = prevOrNext === 'prev' && activePage !== 1;
    const isNotLast = prevOrNext === 'next' && activePage !== totalPages;
    
    if (isNotFirst || isNotLast) {
      let flag = 0;
      paginOrder.forEach((pagin, index) => {
        if (pagin.page === activePage) {
          flag = index;
        }
      });

      const index = prevOrNext === 'prev' ? flag -= 1 : flag += 1;
      const pageNum = paginOrder[index].page;

      onChangeToParent(pageNum);
    }
  }

  const onChangeToParent = (pageNum: number) => {
    if (onChange) { onChange(pageNum); }
  }

  return (
    <div className="pagination-wrapper">
      { totalPages !== 0 &&
        <>
          <button
            className="prev-next-btn"
            onClick={() => onCLickPrevNext('prev')}>
              Prev
          </button>

          <div className="page-button-wrapper">
            {
              paginOrder.map(num =>
                <button
                  className='pagin-btn'
                  key={`pagin-${num.id}`}
                  onClick={() => onChangeToParent(num.page)}>
                    <span className={ activePage === num.page ? 'active' : 'in-active' }>{ num.page }</span>
                </button>
              )
            }
          </div>

          <button
            className="prev-next-btn"
            onClick={() => onCLickPrevNext('next')}>
              Next
          </button>
        </>
      }
    </div>
  );
}

export default Pagination;