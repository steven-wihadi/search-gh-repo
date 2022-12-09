import { useEffect, useState } from 'react';
import './style.css';

interface PropsType {
  totalPages: number;
  activePage: number;
  onChange?: (pageClicked: number) => void;
}

const Pagination = (props: PropsType) => {
  const {totalPages, activePage, onChange} = props;
  const [paginOrder, setPaginOrder] = useState([{ page: 1, id: 1 }]);

  useEffect(() => {
    initPagination();
  }, [totalPages]);

  const initPagination = () => {
    const resultPages = [];
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i += 1) {
        if (resultPages.length !== 3) {
          resultPages.push({ page: i, id: i });
        }
      }
  
      setPaginOrder([...resultPages]);
    }
  }

  const onClickPagin = (paginId: number, pageNum: number) => {
    const resultPages = JSON.parse(JSON.stringify(paginOrder));
    switch(paginId) {
      case 1:
        if (paginOrder[0].page !== 1) {
          resultPages[0].page -= 1;
          resultPages[1].page -= 1;
          resultPages[2].page -= 1;
          
        }
        break;
      case 3:
        if (totalPages > 3 && paginOrder[2].page !== totalPages) {
          resultPages[0].page += 1;
          resultPages[1].page += 1;
          resultPages[2].page += 1;
        }
        break;
      default: break;
    }

    setPaginOrder([...resultPages]);
    if (onChange) { onChange(pageNum); }
  }

  const onCLickPrevNext = (prevOrNext: 'prev' | 'next' ) => {
    if (
      (prevOrNext === 'prev' && activePage !== 1)
      || (prevOrNext === 'next' && activePage !== totalPages)
    ) {
      let flag = 0;
      paginOrder.forEach((pagin, index) => {
        if (pagin.page === activePage) {
          flag = index;
        }
      });

      const index = prevOrNext === 'prev' ? flag -= 1 : flag += 1;
      const pageId = paginOrder[index].id;
      const pageNum = paginOrder[index].page;
      onClickPagin(pageId, pageNum);
    }
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
                  onClick={() => onClickPagin(num.id, num.page)}>
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