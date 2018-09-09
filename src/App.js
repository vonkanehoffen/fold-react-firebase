import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Typography from 'typography'
import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'
import DatabaseTest from './screens/DatabaseTest'
import CreateUpdateFold from './screens/CreateUpdateFold'
import AuthObserver from './containers/AuthObserver'
import WelcomeScreen from './screens/WelcomeScreen'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Lato', 'sans-serif'],
  bodyFontFamily: ['Libre Baskerville', 'serif'],
  // See below for the full list of options.
})

typography.injectStyles()

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/auth" component={AuthScreen}/>
          <Route path="/">
            <AuthObserver>
              <Switch>
                <Route path="/welcome" component={WelcomeScreen}/>
                <Route path="/new" component={CreateUpdateFold}/>
                <Route path="/edit/:id" component={CreateUpdateFold}/>
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
