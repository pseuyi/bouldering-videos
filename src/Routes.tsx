import React, {useState} from 'react';
import Route, {RouteType} from './Route';

const Routes: React.FC<{data: {routes: RouteType[]}}> = ({data}) => {
  const [route, setRoute] = useState<RouteType>();
  const [hoverCell, setHoverCell] = useState();
  const [hoverRoute, setHoverRoute] = useState();

  console.log('hoverCell ', hoverCell);

  const D = 4; // grid dimension
  const T = 19; // total cells
  const findNeighbors = () => {
    if (hoverCell === undefined) return [];

    const i = hoverCell;
    const res = [];

    //left
    if (i % 4 !== 0) {
      res.push(i - 1);
    }

    //right
    if (i % 4 !== 3) {
      res.push(i + 1);
    }

    //above row
    if (i >= 3) {
      if (i - 5 >= 0 && i % 4 !== 0) {
        res.push(i - 5);
      }
      if (i - 4 >= 0) {
        res.push(i - 4);
      }
      if (i - 3 >= 0 && i % 4 !== 3) {
        res.push(i - 3);
      }
    }

    //below
    if (i <= 15) {
      if (i + 5 <= T && i % 4 !== 3) {
        res.push(i + 5);
      }
      if (i + 4 <= T) {
        res.push(i + 4);
      }
      if (i + 3 <= T && i % 4 !== 0) {
        res.push(i + 3);
      }
    }

    return res;
  };

  const neighbors = findNeighbors();

  const cnGrid =
    'grid grid-cols-4 p-6 border border-gray-600 rounded hover:bg-gray-200 divide-y divide-gray-600 divide-solid';
  return (
    <>
      <div className={cnGrid}>
        {data.routes.map((r: RouteType, i: number) => {
          let cn = 'cursor-pointer p-3 py-6 text-lg';

          if (hoverCell !== i) {
            //cn += ' rounded';
          }

          const bg = hoverRoute ? `bg-yellow-${Math.round(Math.round(hoverRoute.stars) * 100)}` : 'bg-yellow-400'
          if (neighbors.includes(i)) {
            cn += ` ${bg} text-yellow-500`;
          } else {
            cn += ` border-gray-600 hover:${bg}`;
          }

          return (
            <div
              className={cn}
              onClick={() => setRoute(r)}
              onMouseEnter={() => {
                setHoverCell(i);
                setHoverRoute(r);
              }}
              onMouseLeave={() => {
                setHoverCell(undefined);
                setHoverRoute(undefined);
              }}
              key={i + 1}>
              {/*<p>stars {r.stars}</p>*/}
              {r.name} {r.rating}
              {/**  * {r.location[r.location.length - 1]}*/}

              {route?.id === r.id ? <Route route={route} /> : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Routes;
