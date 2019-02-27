import React from 'react';
import { render } from 'react-dom';
import { injectGlobal } from 'emotion';
import { BrowserRouter, Route } from 'react-router-dom';

import { ApplicationRouter } from './routing/ApplicationRouter';

const App = () => (
  <BrowserRouter>
    <ApplicationRouter />
  </BrowserRouter>
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
