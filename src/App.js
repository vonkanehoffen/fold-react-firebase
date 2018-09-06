import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'
import DatabaseTest from './screens/DatabaseTest'
import CreateFold from './screens/CreateFold'
import NavBar from './containers/NavBar'
import AuthObserver from './containers/AuthObserver'
import WelcomeScreen from './screens/WelcomeScreen'

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/auth" component={AuthScreen}/>
          <Route path="/">
            <AuthObserver>
              <NavBar/>
              <Switch>
                <Route path="/welcome" component={WelcomeScreen}/>
                <Route path="/new" component={CreateFold}/>
                <Route path="/" component={HomeScreen}/>
              </Switch>
            </AuthObserver>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
