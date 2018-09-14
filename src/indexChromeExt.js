import React from 'react';
import ReactDOM from 'react-dom';
import AppChromeExt from './AppChromeExt';
import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root')

ReactDOM.render(
  <AppChromeExt />,
  rootEl
)

if (module.hot) {
  // See https://medium.com/superhighfives/hot-reloading-create-react-app-73297a00dcad
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}

registerServiceWorker();
