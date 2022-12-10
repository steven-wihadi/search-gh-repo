import { useState } from 'react';
import GitHubLogo from '../../assets/images/github-logo.png';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import Fetcher from '../../services/RestApi.service';
import RepositoryItem from './components/RepositoryItem';
import './style.css';

const Landing = () => {
  const [keyword, setKeyword] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState('Result will appear in here..');
  const [repos, setRepos] = useState([]);

  const onChangePagination = (pageClicked) => {
    if (message !== 'Loading...') {
      setActivePage(pageClicked);
      fetch(keyword, pageClicked);
    }
  }

  function fetch(query, page, isUpdateTotalPages = false) {
    setMessage('Loading...');
    const url = `/repositories?q=${ query };page=${ page };per_page=4`;
    Fetcher.get(url).then(res => {
      if (res.status === 200 && res.statusText === 'OK') {
        const data = res.data;
        
        if (data.total_count > 0) {
          const temp = [];
          if (isUpdateTotalPages) {
            const total_count = data.total_count > 250 ? 250 : data.total_count;
            setTotalPages(JSON.parse(JSON.stringify(total_count)));
          }

          data.items.forEach(item => {
            temp.push({
              id: item.id,
              picture: item.owner.avatar_url,
              title: item.name,
              createdBy: item.owner.login
            });
          });

          setRepos([...temp]);
        }
        
        setTimeout(() => {
          setMessage(data.total_count === 0 ? 'Data not found' : '');
        }, 1000);
      } 
    }, err => {
      setMessage('Error, please try again.');
      setTotalPages(0);
    });
  }

  const onSearch = (val) => {
    fetch(val, 1, true);
    setActivePage(1);
  }

  return (
    <div className='landing-wrapper'>
      <img src={ GitHubLogo } alt='github-logo' />
      <SearchBar
        keyword={ keyword }
        placeHolder='Search repository name here...'
        onChange={(e: any) => setKeyword(e.target.value)}
        onClickSearch={() => onSearch(keyword)}
        debounceSearch={(e: any) => onSearch(e.target.value)}
      />

      { message === '' &&
        <div className='result-container'>
          { repos.map(repo =>
              <RepositoryItem
                key={ repo.id }
                picture={ repo.picture }
                title={ repo.title }
                owner={ repo.createdBy }
              />
            )
          }
        </div>
      }
      
      { message !== '' &&
        <div className='message-box'>
          { message }
        </div>
      }

      <div className='landing-pagination-wrapper'>
        <Pagination
          activePage={ activePage }
          totalPages={ totalPages }
          onChange={ onChangePagination }
        />
      </div>
    </div>
  );
}

export default Landing;