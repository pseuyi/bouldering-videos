import React from 'react';
import ReactDOM from 'react-dom';
import {SWRConfig} from 'swr';
import './index.css';
import App from './components/App';

const fetcher = (url: string) => {
  return fetch(url).then(r => r.json());
};

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher,
      }}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root'),
);
