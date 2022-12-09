import SearchIcon from '../../assets/images/search.png';
import './style.css';

let timeId: any;
interface PropTypes {
  style?: any;
  onClickSearch?: () => void;
  onChange?: (event: string) => void;
  debounceSearch?: (event: string) => void;
  keyword: string;
  placeHolder?: string;
}

const Input = (props: PropTypes) => {
  const {style, onClickSearch, onChange, keyword, debounceSearch, placeHolder} = props;

  const onChangeInput = (e: any) => {
    if (onChange) {
      onChange(e);
    }

    clearTimeout(timeId);
    timeId = setTimeout(() => {
      if (debounceSearch && e.target.value !== '' && e.target.value !== ' ') {
        debounceSearch(e);
      }
    }, 3000);
  }

  const onClickSearchBtn = () => {
    if (onClickSearch) {
      clearTimeout(timeId);
      onClickSearch();
    }
  }

  const onKeydown = (e: any) => {
    if (e.key === 'Enter') {
      clearTimeout(timeId);
      onClickSearch();
    }
  }

  return (
    <div className="search-bar-wrapper" style={ style }>
      <input
        type='text'
        placeholder={ placeHolder ? placeHolder : 'Search...' }
        onChange={(e) => onChangeInput(e)}
        value={ keyword }
        onKeyDown={(e) => onKeydown(e)}
      />
      <button onClick={ onClickSearchBtn }>
        <img src={ SearchIcon } alt='serach-btn-icon' />
      </button>
    </div>
  );
}

export default Input;