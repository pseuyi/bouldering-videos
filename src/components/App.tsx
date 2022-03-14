import React, {useState} from 'react';
import useSWR from 'swr';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

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

  //getTodos
  /*
  const {data, error} = useSWR(
    `https://www.mountainproject.com/data/get-to-dos?email=pseuyi@gmail.com&key=${MP_KEY}`,
  );
  */

  const data = {toDos:[105735644, 112362748, 110851542, 108233422, 111328333, 106049465, 106552992, 117873186, 117873268, 117873127, 117051979, 110850118, 105736193, 110795774, 110698815, 110795656, 110995183, 105735659, 110616145, 112361987, 111322917, 116298099, 113562839, 113562866, 114456881, 107905220, 106522616, 113278526, 107385804, 106056281, 106652010, 119534511, 114279975, 118028977, 118758179, 107074342, 113563997, 112409537, 111610928, 113573829, 117371757, 107430940, 106964471, 110756625, 113574039, 116165433, 116165446, 119473731, 112409512, 119546523, 119744808, 106388657, 106321707, 106649376, 106118465, 106076122, 106294784, 105722350, 105721747, 105722608, 106051737, 105826075, 105733016, 105820177, 105826602, 108551943, 105937677]}

  /*
  const {data, error} = useSWR(
    `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${lat}&lon=${lng}&maxDistance=10&maxResults=20&minDiff=V${queryMin}&maxDiff=V${queryMax}&key=${MP_KEY}`,
  );

  // TODO: create error boundary
  if (error) return <div>failed to fetch</div>;
  */
  if (!data) return <Wrapper>loading...</Wrapper>;

  const cnInput = 'border rounded border-gray-600 p-2 w-full outline-none';
  const cnLabel = 'text-md font-thin text-blue-600';
  const activeDotColor = '#2563EB'; //blue700
  const handleColor = '#2563EB';
  const railColor = '#D1D5DB';

  //TODO load user ticks/todos
  return (
    <Wrapper>
      <header className="text-6xl font-bold mb-6 cursor-default text-gray-800">
        <img className="inline mr-6" width="100" src="boulderer.png" />
        <span>boulderer</span>
      </header>

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

      <Routes todos={data.toDos}/>

      <div className="mt-24">@pseuyi</div>
    </Wrapper>
  );
};

export default AppContainer;
