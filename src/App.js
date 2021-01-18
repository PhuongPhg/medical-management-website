import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter } from 'react-router-dom'
import Register from './views/register';
import Login from './views/login';
import ForgotPassword from './views/forgotPassword';
import RegistrationForm from './views/registrationform';
import Homepage from './views/homepage';
import Dashboard from './views/dashboard';
import Schedule from './views/schedule';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/forgot" component={ForgotPassword}/>
        <Route path="/registrationform" component={RegistrationForm}/>
        <Route path="/homepage" component={Homepage}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/schedule" component={Schedule}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
