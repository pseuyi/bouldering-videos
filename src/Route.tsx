import React from 'react';
import {findNeighbors, D, T} from './grid';
import {Cell, RouteType} from './types';
import Video from './Video';

interface Props {
  cell: number;
  hoverCell: Cell;
  hoverRoute?: RouteType;
  route?: RouteType;
  selected?: RouteType;
  setSelected: (v?: RouteType) => void;
  setHoverCell: (v: Cell) => void;
  setHoverRoute: (v: any) => void;
}

const Route: React.FC<Props> = ({
  cell,
  hoverCell,
  hoverRoute,
  route,
  selected,
  setSelected,
  setHoverCell,
  setHoverRoute,
}) => {
  const neighbors = findNeighbors(hoverCell);

  let cn = 'cursor-pointer p-8 text-lg';

  const shade = () =>
    hoverRoute ? Math.round(Math.round(hoverRoute.stars) * 100) : 400;
  const bg = hoverRoute ? `bg-yellow-${shade()}` : 'bg-yellow-400';
  const text = hoverRoute ? `text-yellow-${shade()}` : '';
  const gray600 = '#4B5563';
  const border = `1px solid ${gray600}`;

  const neighbor = neighbors.includes(cell);
  const hovered = cell === hoverCell;

  if (neighbor) {
    cn += ` ${bg} ${text}`;
  } else {
    cn += ` border-gray-600 hover:${bg}`;
  }

  let style: React.CSSProperties = {};
  if (cell === T) {
    // bottom right cell
    style = {
      borderBottomRightRadius: '0.25rem',
    };

    if (neighbor || hovered) {
      style = {...style, borderRight: border, borderBottom: border};
    } else {
      style = {...style, border};
    }
  } else if (cell === 0) {
    // top left cell
    style = {
      borderLeft: border,
      borderTop: border,
      borderTopLeftRadius: '0.25rem',
    };
  } else if (cell % 4 === 0) {
    // left col
    style = {
      borderLeft: border,
      borderTop: border,
    };

    if (neighbor || hovered) {
      style = {borderLeft: border};

      //bottom left cell
      if (cell === T + 1 - D) {
        style = {borderLeft: border, borderBottom: border};
      }
    } else if (cell === T + 1 - D) {
      style = {...style, borderBottom: border};
    }
  } else if (cell <= D - 1) {
    //top row
    style = {
      borderLeft: border,
      borderTop: border,
    };

    if (neighbor || hovered) {
      style = {borderTop: border};
      if (cell === D - 1) {
        style = {
          ...style,
          borderRight: border,
        };
      }
    } else if (cell === D - 1) {
      style = {
        ...style,
        borderRight: border,
      };
    }
  } else if (cell + D > T) {
    // bottom row
    style = {borderBottom: border};

    if (!neighbor && !hovered) {
      style = {
        ...style,
        borderLeft: border,
        borderTop: border,
      };
    }

    //bottom right cell
    if (cell === T - 3) {
      style = {...style, borderBottomLeftRadius: '0.25rem'};
    }
  } else if ((cell + 1) % 4 === 0) {
    // right col
    if (!neighbor && !hovered) {
      style = {
        ...style,
        borderLeft: border,
        borderTop: border,
      };
    }

    style = {...style, borderRight: border};

    if (cell === D - 1) {
      style['borderTopRightRadius'] = '0.25rem';
    }
  } else if (!neighbor && !hovered) {
    style = {
      borderLeft: border,
      borderTop: border,
    };
  }

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
      key={cell + 1}>
      {route?.name} {route?.rating}
      {route !== undefined && selected?.id === route?.id ? (
        <Video route={route} />
      ) : null}
    </div>
  );
};

export default Route;
