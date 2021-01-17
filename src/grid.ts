import {Cell} from './types';

export const D = 4; // grid dimension
export const T = 19; // total cells

export const findNeighbors = (cell: Cell) => {
  return cell
    ? [-4, -3, -2, -1, 1, 2, 3, 4]
        .map(v => cell + v)
        .filter(v => v >= 0 && v < T)
    : [];
};

export const cellStyles = (
  cell: Cell,
  neighbors: Cell[],
  hoverCell: Cell,
): React.CSSProperties => {
  let style: React.CSSProperties = {};

  const neighbor = neighbors.includes(cell);
  const hovered = cell === hoverCell;

  const gray600 = '#4B5563';
  const border = `1px solid ${gray600}`;

  if (!cell) return {};

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

  return style;
};
