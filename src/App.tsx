import React from 'react';
import useSWR from 'swr';
import {useState} from 'react';
import Problem from './Problem';
import './App.css';

const MP_KEY = process.env.REACT_APP_MP_API_KEY;

const fetcher = (url: any) => fetch(url).then(r => r.json());

const App: React.FC<{data: any}> = ({data}) => {
  const [problem, setProblem] = useState();
  const handleProblemClick = (route: any) => {
    setProblem(route);
  };

  return (
    <div className="App">
      <header className="App-header">bouldering videos</header>

      <ul>
        {data.routes.map((r: any, i: number) => (
          <li onClick={() => handleProblemClick(r)} key={i}>
            {r.name} * {r.rating} * {r.location[r.location.length - 1]}
          </li>
        ))}
      </ul>
      {problem ? <Problem route={problem} /> : null}
    </div>
  );
};

const AppContainer: React.FC = () => {
  const [lat, setLat] = useState(37.22); //useState(40.715);
  const [lon, setLon] = useState(-122.12); //useState(-73.993);

  const {data, error} = useSWR(
    `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${lat}&lon=${lon}&maxDistance=10&maxResults=20&minDiff=V0&maxDiff=V15&key=${MP_KEY}`,
    fetcher,
  );

  // TODO: create error boundary
  if (error) return <div> failed to fetch</div>;
  if (!data) return <div> loading...</div>;

  console.log('mp data', data);

  return (
    <>
      <label>lat</label>
      <input
        name="lat"
        type="text"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setLat(parseInt(e.currentTarget.value, 10))
        }
        value={lat}></input>
      <label>lon</label>
      <input
        name="lon"
        type="text"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setLon(parseInt(e.currentTarget.value, 10))
        }
        value={lon}></input>

      <App data={data} />
    </>
  );
};

export default AppContainer;
