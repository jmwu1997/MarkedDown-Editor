import React from 'react';
import Login from "./pages/login-page/login";
import Register from "./pages/register-page/register";
import Navbar from "./pages/home-page/navbar";
import { Router, Route } from 'react-router-dom';
import Editor from "./pages/editor-page/editor";
import About from "./pages/about-page/about";
// import Sidebar from "./pages/home-page/sidebar"
import history from './history';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      userState: null
    }
  }

  setUserState(token,username) {
    localStorage.setItem('token',token);
    localStorage.setItem('username',username);
    this.setState({
      userState: token
    });
    history.push('/editor');
  }

  clearUserState(){
    localStorage.clear();
    this.setState({
      userState: null
    });
    history.push('/login');
  }

  render() {
    return (
      <Router history={history}>
        <div className="container">
          <Navbar parentState={this.state.userState} clearMethod={this.clearUserState.bind(this)} />
          <Route path="/" exact component={About} />
          <Route path="/login" render={()=><Login parentMethod={this.setUserState.bind(this)}/>} />
          <Route path="/register" component={Register} />
          <Route path="/editor" component={Editor} />
        </div>
      </Router>
    );
  }
}


export default App;
