import GitHubLogo from '../../assets/images/github-logo.png';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import RepositoryItem from './components/RepositoryItem';
import './style.css';

const Landing = () => {
  return (
    <div className='landing-wrapper'>
      <img src={ GitHubLogo } alt='github-logo' />
      <SearchBar keyword="" />

      <div className='result-container'>
        <RepositoryItem />
        <RepositoryItem />
        <RepositoryItem />
        <RepositoryItem />
      </div>

      <div className='landing-pagination-wrapper'>
        <Pagination />
      </div>
    </div>
  );
}

export default Landing;