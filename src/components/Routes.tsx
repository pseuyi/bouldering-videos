import React, {useState} from 'react';
import Route from './Route';
import {T} from '../utils/grid';
import {Cell, RouteType} from '../types';
import mockData from '../data';

interface Props {
  todos: number[];
}

const Routes: React.FC<Props> = ({todos}) => {
  console.log('todos: ', todos);
  const data = mockData;
  const [selected, setSelected] = useState<RouteType | undefined>();
  //TODO remove or add hover state css
  const [hoverCell, setHoverCell] = useState<Cell>();
  const [hoverRoute, setHoverRoute] = useState<RouteType>();

  const cnGrid = 'grid grid-cols-4 rounded hover:bg-yellow-100 text-gray-800';

  const routes: (RouteType | undefined)[] = data ? data.routes : [];
  //creates empty cells if fewer than T routes
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
  if (routes !== undefined && !routes.length) {
    return (
      <div className={cnGrid + ' border border-gray-600 p-8 text-lg'}>
        <div className="col-span-4 text-center">no routes found!</div>
      </div>
    );
  }

  let cn = 'cursor-pointer p-8 text-lg';

  const text = 'text-gray-600';

  cn += ` bg-white ${text}`;
  cn += ` hover:bg-yellow-400`;

  return (
    <div
      className={cnGrid}
      onMouseLeave={() => {
        //close popup if leaving grid
        setSelected(undefined);
      }}>
      {routes.map((r: RouteType | undefined, i: number) => {
        const cell = i;

        /*
        const neighbor = neighbors.includes(cell);
        if (neighbor) {
          cn += ` bg-yellow-400`;
        }
         */

        const inTodos = r && todos.includes(r.id)

        return (
          <Route
            key={i}
            cell={cell}
            cn={cn}
            route={r}
            selected={selected}
            setSelected={setSelected}
            setHoverCell={setHoverCell}
            setHoverRoute={setHoverRoute}
            style={{}}
          />
        );
      })}
    </div>
  );
};

export default Routes;
