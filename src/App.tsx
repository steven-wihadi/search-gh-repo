import './App.css';
import Fetcher from './services/RestApi.service';
import Landing from './pages/Landing';

function App() {

  const getRepo = () => {
    const url = `/repositories?q=steven`;
    Fetcher.get(url).then(res => {
      console.log('(OK)res: ', res);
    }, err => {
      console.log('(X)err: ', err);
    });
  }

  return (
    <div className="App">
      {/* <button onClick={ getRepo }>Click</button> */}
      <Landing />
    </div>
  );
}

export default App;
