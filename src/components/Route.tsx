import React from 'react';
import {Cell, RouteType} from '../types';
import Video from './Video';

interface Props {
  cell: number;
  cn: string;
  route?: RouteType;
  selected?: RouteType;
  setSelected: (v?: RouteType) => void;
  setHoverCell: (v: Cell) => void;
  setHoverRoute: (v?: RouteType) => void;
  style: React.CSSProperties;
  todo?: boolean;
}

const Route: React.FC<Props> = ({
  cell,
  cn,
  route,
  selected,
  setSelected,
  setHoverCell,
  setHoverRoute,
  style,
  todo,
}) => {
  const routeDefined = route !== undefined;
  return (
    <div
      style={style}
      className={`${cn} relative`}
      onClick={() => {
        if (selected?.id === route?.id) {
          setSelected(undefined);
        } else {
          route && setSelected(route);
        }
      }}
      onMouseEnter={() => {
        //close popup if entering a non neighbor
        /*
        if (!neighbor) {
          setSelected(undefined);
        }
         */

        if (routeDefined) {
          setHoverCell(cell);
          setHoverRoute(route);
        }
      }}
      onMouseLeave={() => {
        if (routeDefined) {
          setHoverCell(undefined);
          setHoverRoute(undefined);
        }
      }}
      key={cell}>
      {todo ? <div className="rounded-full border-black border-2 border-solid inline px-2 absolute top-0 left-0 text-xs">todo</div>: null}
      {route?.name} {route?.rating}
      {/* TODO expand cell to show these videos */}
      {route !== undefined && selected?.id === route?.id ? (
        <Video route={route} />
      ) : null}
    </div>
  );
};

export default Route;
