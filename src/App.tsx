import React from 'react';
import useSWR from 'swr';
import {useState} from 'react';
import Problem from './Problem';
import './App.css';

const MP_KEY = process.env.REACT_APP_MP_API_KEY;

const fetcher = (url: any) => fetch(url).then(r => r.json());

function App() {
  const [lat, setLat] = useState(40.03);
  const [lon, setLon] = useState(-105.25);
  const [problem, setProblem] = useState();

  const {data, error} = useSWR(
    `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${lat}&lon=${lon}&maxDistance=10&maxResults=20&minDiff=V0&maxDiff=V15&key=${MP_KEY}`,
    fetcher,
  );

  // TODO: create error boundary
  if (error) return <div> failed to fetch</div>;
  if (!data) return <div> loading...</div>;

  console.log('mp data', data);

  const onsuccess = (pos: any) => {
    setLat(pos.coords.latitude);
    setLon(pos.coords.longitude);
  };

  const onerror = () => {
    return <div>error</div>;
  };

  if (!navigator.geolocation) {
    return <div>Geolocation is not supported by your browser</div>;
  } else {
    navigator.geolocation.getCurrentPosition(onsuccess, onerror);
  }

  const handleProblemClick = (route: any) => {
    setProblem(route);
  };

  const showProblem = () => {
    if (problem) return <Problem route={problem} />;
    else return <></>;
  };

  return (
    <div className="App">
      <header className="App-header">bouldering videos</header>
      <div>lat: {lat}</div>
      <div>lon: {lon}</div>

      <ul>
        {data.routes.map((r: any, i: number) => (
          <li onClick={() => handleProblemClick(r)} key={i}>
            {r.name} * {r.rating} * {r.location[r.location.length - 1]}
          </li>
        ))}
      </ul>
      {showProblem()}
    </div>
  );
}

export default App;
