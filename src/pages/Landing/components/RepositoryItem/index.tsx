import './style.css';

interface PropsType {
  picture: string,
  title: string,
  owner: string
}

const RepositoryItem = (props: PropsType) => {
  const {picture, title, owner} = props;

  return (
    <div className='repository-wrapper'>
      <img src={ picture } alt="user-logo" />

      <div className='repository-info'>
        <h3>{ title }</h3>
        <span>Owner: <h4>{ owner }</h4></span>
      </div>
    </div>
  );
}

export default RepositoryItem;