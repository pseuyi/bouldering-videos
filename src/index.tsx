import React from 'react';
import ReactDOM from 'react-dom';
import {SWRConfig} from 'swr';
import './index.css';
import App from './App';

const fetcher = (url: string) => {
  //console.log('fetching ', url);
  return fetch(url).then(r => r.json());
};
ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher,
          //revalidateOnMount: false,
      }}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root'),
);
