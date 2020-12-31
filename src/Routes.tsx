import React, {useEffect, useState} from 'react';
import Route from './Route';
import Video from './Video';
import {T} from './grid';
import {Cell, RouteType} from './types';

const Routes: React.FC<{data?: {routes: RouteType[]}}> = ({data}) => {
  const [selected, setSelected] = useState<RouteType|undefined>();
  const [hoverCell, setHoverCell] = useState<Cell>();
  const [hoverRoute, setHoverRoute] = useState<any>();

  const cnGrid = 'grid grid-cols-4 rounded hover:bg-yellow-100 text-gray-800';

  const routes: (RouteType | undefined)[] = data ? data.routes : [];
  //create empty cells if fewer than T routes
  let i = routes.length;
  while (i <= T) {
    routes.push(undefined);
    i++;
  }

  if (!data) {
    return (
      <div className={cnGrid + ' border border-gray-600 p-8 text-lg'}>
        <div className="col-span-4 text-center">loading</div>
      </div>
    );
  }

  //empty state
  if (data?.routes !== undefined && !data?.routes.length) {
    return (
      <div className={cnGrid + ' border border-gray-600 p-8 text-lg'}>
        <div className="col-span-4 text-center">no routes found!</div>
      </div>
    );
  }

  return (
    <div className={cnGrid} onMouseLeave={() => {
      //close popup if leaving grid
      //setSelected(undefined);
    }}>
      {routes.map((r: RouteType | undefined, i: number) => {
        return (
          <Route
            key={i}
            cell={i}
            hoverCell={hoverCell}
            hoverRoute={hoverRoute}
            route={r}
            selected={selected}
            setSelected={setSelected}
            setHoverCell={setHoverCell}
            setHoverRoute={setHoverRoute}
          />
        );
      })}
    </div>
  );
};

export default Routes;
