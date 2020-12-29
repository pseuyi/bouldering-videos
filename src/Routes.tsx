import React, {useState} from 'react';
import Route, {RouteType} from './Route';

const Routes: React.FC<{data: {routes: RouteType[]}}> = ({data}) => {
  const [route, setRoute] = useState<RouteType>();
  const [hoverCell, setHoverCell] = useState();
  const [hoverRoute, setHoverRoute] = useState();

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

  const cnGrid = 'grid grid-cols-4 rounded hover:bg-yellow-100 text-gray-800';
  return (
    <>
      <div className={cnGrid}>
        {data.routes.map((r: RouteType, i: number) => {
          let cn = 'cursor-pointer p-8 text-lg';

          const shade = () => Math.round(Math.round(hoverRoute.stars) * 100);
          const bg = hoverRoute ? `bg-yellow-${shade()}` : 'bg-yellow-400';
          const text = hoverRoute ? `text-yellow-${shade()}` : '';
          const gray600 = '#4B5563';
          const border = `1px solid ${gray600}`;

          const neighbor = neighbors.includes(i);
          const hovered = i === hoverCell;

          if (neighbor) {
            cn += ` ${bg} ${text}`;
          } else {
            cn += ` border-gray-600 hover:${bg}`;
          }

          let style: React.CSSProperties = {};
          if (i === T) {
            // bottom right cell
            style = {
              borderBottomRightRadius: '0.25rem',
            };

            if (neighbor || hovered) {
              style = {...style, borderRight: border, borderBottom: border};
            } else {
              style = {...style, border};
            }
          } else if (i === 0) {
            // top left cell
            style = {
              borderLeft: border,
              borderTop: border,
              borderTopLeftRadius: '0.25rem',
            };
          } else if (i % 4 === 0) {
            // left col
            style = {
              borderLeft: border,
              borderTop: border,
            };

            if (neighbor || hovered) {
              style = {borderLeft: border};

              //bottom left cell
              if (i === T + 1 - D) {
                style = {borderLeft: border, borderBottom: border};
              }
            } else if (i === T + 1 - D) {
              style = {...style, borderBottom: border};
            }
          } else if (i <= D - 1) {
            //top row
            style = {
              borderLeft: border,
              borderTop: border,
            };

            if (neighbor || hovered) {
              style = {borderTop: border};
              if (i === D - 1) {
                style = {
                  ...style,
                  borderRight: border,
                };
              }
            } else if (i === D - 1) {
              style = {
                ...style,
                borderRight: border,
              };
            }
          } else if (i + D > T) {
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
            if (i === T - 3) {
              style['borderBottomLeftRadius'] = '0.25rem';
            }
          } else if ((i + 1) % 4 === 0) {
            // right col
            if (!neighbor && !hovered) {
              style = {
                ...style,
                borderLeft: border,
                borderTop: border,
              };
            }

            style = {...style, borderRight: border};

            if (i === D - 1) {
              style['borderTopRightRadius'] = '0.25rem';
            }
          } else if (!neighbor && !hovered) {
            style = {
              borderLeft: border,
              borderTop: border,
            };
          }

          return (
            <div
              style={style}
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
              {r.name} {r.rating}
              {route?.id === r.id ? <Route route={route} /> : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Routes;
