import React, {useState} from 'react';
import useSWR from 'swr';
import Header from './Header';
import Spinner from './Spinner';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import data, {mockToDos} from '../data';

import PlaceAutocomplete from './PlaceAutocomplete';
import Routes from './Routes';

const MP_KEY = process.env.REACT_APP_MP_API_KEY;

const marksWithLabels = [...Array(17).keys()].reduce((acc, cur) => {
  acc[cur] = `V${cur}`;
  return acc;
}, {} as Record<number, string>);

const Wrapper: React.FC = ({children}) => {
  return (
    <div className="mx-6 my-3 md:mx-12 md:my-6 lg:mx-24 lg:my-12">
      <div className="">{children}</div>
    </div>
  );
};

const AppContainer: React.FC = () => {
  // slider state
  const [minGrade, setMinGrade] = useState<number>(3);
  const [maxGrade, setMaxGrade] = useState<number>(14);
  const [queryMin, setQueryMin] = useState<number>(0);
  const [queryMax, setQueryMax] = useState<number>(17);

  const [lat, setLat] = useState<number | undefined>(40.715);
  const [lng, setLng] = useState<number | undefined>(-73.993);

  //getTodos from MP (depr)
  /*
  const {data, error} = useSWR(
    `https://www.mountainproject.com/data/get-to-dos?email=pseuyi@gmail.com&key=${MP_KEY}`,
  );

  const {data, error} = useSWR(
    `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${lat}&lon=${lng}&maxDistance=10&maxResults=20&minDiff=V${queryMin}&maxDiff=V${queryMax}&key=${MP_KEY}`,
  );
   */

  // TODO: create error boundary
  const error = false;

  const cnInput = 'border rounded border-gray-600 p-2 w-full outline-none';
  const cnLabel = 'text-md font-thin text-blue-600';
  const activeDotColor = '#2563EB'; //blue700
  const handleColor = '#2563EB';
  const railColor = '#D1D5DB';

  //TODO load user ticks/todos
  return (
    <Wrapper>
      <div className="mt-24 text-right"><a href="https://pseuyi.dev">@pseuyi</a></div>
      <Header />
      <div className="flex flex-col mb-6">
        <label className={cnLabel}>location</label>
        <PlaceAutocomplete
          className={cnInput}
          setLat={setLat}
          setLng={setLng}
        />
      </div>
      <div className="flex flex-col mb-12">
        <label className={cnLabel}>grade</label>
        <div className="px-1 py-2">
          <Range
            className="h-1/12 w-full relative"
            marks={marksWithLabels}
            dots
            railStyle={{backgroundColor: railColor}}
            trackStyle={[{backgroundColor: handleColor}]}
            handleStyle={[
              {
                backgroundColor: handleColor,
                borderColor: handleColor,
                width: '8px',
                borderRadius: '0',
              },
              {
                backgroundColor: handleColor,
                borderColor: handleColor,
                width: '8px',
                borderRadius: '0',
              },
            ]}
            dotStyle={{
              backgroundColor: railColor,
              borderColor: railColor,
              width: '0px',
              borderRadius: '0',
            }}
            activeDotStyle={{
              backgroundColor: activeDotColor,
              borderColor: activeDotColor,
            }}
            min={0}
            max={17}
            step={1}
            value={[minGrade, maxGrade]}
            onChange={([min, max]) => {
              setMinGrade(min);
              setMaxGrade(max);
            }}
            onAfterChange={() => {
              setQueryMin(minGrade);
              setQueryMax(maxGrade);
            }}
          />
        </div>
      </div>
      {error ? (
        <div>failed to fetch</div>
      ) : data ? (
        <Routes data={data} todos={mockToDos.toDos} />
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default AppContainer;
