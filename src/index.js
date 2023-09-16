import React from 'react';
import {StrictMode} from 'react'
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';


ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <StrictMode>
      <App/>
    </StrictMode>
  )


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

