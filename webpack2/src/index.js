
import React from 'react';
import { render } from 'react-dom';

import { Root } from './Root';

const renderApp = () => {
  render(<Root />, document.querySelector('react'));
};

renderApp();

if (module.hot) {
  module.hot.accept('../src', renderApp);  
}
