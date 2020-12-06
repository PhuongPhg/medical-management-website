import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter } from 'react-router-dom'
import Register from './register';
import Login from './login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Register}/>
        <Route path="/login" component={Login}/>
      </BrowserRouter>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
