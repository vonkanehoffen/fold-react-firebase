import React, { Component } from 'react';
import styled from'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'normalize.css'
import './App.css'
import AuthScreen from './screens/AuthScreen'
import AuthEmailScreen from './screens/AuthEmailScreen'
import CreateUpdateFold from './screens/CreateUpdateFold'
import AuthObserver from './containers/AuthObserver'
import AboutScreen from './screens/AboutScreen'
import SaveSuccessChromeExt from './screens/SaveSuccessChromeExt'

class App extends Component {

  render() {
    return (
      <ExtOuter>
        <Router>
          <Switch>
            <Route path="/auth/email" component={AuthEmailScreen}/>
            <Route path="/auth" component={AuthScreen}/>
            <Route path="/about" component={AboutScreen}/>
            <Route path="/">
              <AuthObserver>
                <Switch>
                  <Route path="/successchrome" component={SaveSuccessChromeExt}/>
                  <Route path="/" component={CreateUpdateFold}/>
                </Switch>
              </AuthObserver>
            </Route>
          </Switch>
        </Router>
      </ExtOuter>
    );
  }
}

const ExtOuter = styled.div`
  width: 400px;
  min-height: 250px;
`

export default App;
