import React from 'react';
import { render } from 'react-dom';
import { injectGlobal } from 'emotion';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import { ApplicationRouter } from './routing/ApplicationRouter';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ApplicationRouter />
    </BrowserRouter>
  </Provider>
);

injectGlobal(`
  @import url('https://fonts.googleapis.com/css?family=Rubik');
  body{
    font-family: 'Rubik', sans-serif;
    font-size: 16px;
  }
  a {
    cursor: pointer;
  }
`);


render(<App />, document.getElementById('application-root'));
