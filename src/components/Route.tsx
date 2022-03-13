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
}) => {
  const routeDefined = route !== undefined;
  return (
    <div
      style={style}
      className={cn}
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
      {route?.name} {route?.rating}
      {/* TODO expand cell to show these videos */}
      {route !== undefined && selected?.id === route?.id ? (
        <Video route={route} />
      ) : null}
    </div>
  );
};

export default Route;
