import React from 'react';
import useSWR from 'swr';
import {useState} from 'react';

import PlaceAutocomplete from './PlaceAutocomplete';
import Route, {RouteType} from './Route';
import './App.css';

const MP_KEY = process.env.REACT_APP_MP_API_KEY;

const Wrapper: React.FC = ({children}) => {
  return (
    <div className="wrapper">
      <div className="content">{children}</div>
    </div>
  );
};

const App: React.FC<{data: any}> = ({data}) => {
  const [route, setRoute] = useState<RouteType>();

  return (
    <>
      <ul>
        {data.routes.map((r: RouteType, i: number) => (
          <li onClick={() => setRoute(r)} key={i}>
            {r.name} * {r.rating} * {r.location[r.location.length - 1]}
          </li>
        ))}
      </ul>
      {route ? <Route route={route} /> : null}
    </>
  );
};

const AppContainer: React.FC = () => {
  // castle rock
  const [lat, setLat] = useState<number | undefined>(36.22); //useState(40.715);
  const [lng, setLng] = useState<number | undefined>(-122.12); //useState(-73.993);

  const {data} = useSWR(
    `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${lat}&lon=${lng}&maxDistance=10&maxResults=20&minDiff=V0&maxDiff=V15&key=${MP_KEY}`,
  );

  // TODO: create error boundary
  //if (error) return <div> failed to fetch</div>;
  if (!data) return <Wrapper> loading...</Wrapper>;

  console.log('mountain project: ', data);
  return (
    <>
      <header className="App-header">bouldering videos</header>
      <PlaceAutocomplete setLat={setLat} setLng={setLng} />
      <Wrapper>
        <div>
          <label>lat</label>
          <input
            name="lat"
            type="text"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setLat(parseInt(e.currentTarget.value, 10))
            }
            value={lat}></input>
        </div>
        <div>
          <label>lng</label>
          <input
            name="lng"
            type="text"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setLng(parseInt(e.currentTarget.value, 10))
            }
            value={lng}></input>
        </div>
        <App data={data} />
      </Wrapper>
    </>
  );
};

export default AppContainer;
