import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter } from 'react-router-dom'
import Register from './views/register';
import Login from './views/login';
import ForgotPassword from './views/forgotPassword';
import RegistrationForm from './views/registrationform';
import Dashboard from './views/dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/forgot" component={ForgotPassword}/>
        <Route path="/registrationform" component={RegistrationForm}/>
        <Route path="/dashboard" component={Dashboard}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
