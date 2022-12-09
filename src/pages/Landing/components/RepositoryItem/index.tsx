import './style.css';

const RepositoryItem = () => {
  return (
    <div className='repository-wrapper'>
      <img src='https://avatars.githubusercontent.com/u/43691553?v=4' alt="user-logo" />

      <div className='repository-info'>
        <h3>stevenarella</h3>
        <span>Owner: <h4>iceiix</h4></span>
      </div>
    </div>
  );
}

export default RepositoryItem;