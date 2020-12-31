import {Cell} from './types';

export const D = 4; // grid dimension
export const T = 19; // total cells

export const findNeighbors = (cell: Cell) => {
  if (cell === undefined) return [];

  const i = cell;
  const res = [];

  //left
  if (i % D !== 0) {
    res.push(i - 1);
  }

  //right
  if (i % D !== 3) {
    res.push(i + 1);
  }

  //above row
  if (i >= 3) {
    if (i - 5 >= 0 && i % D !== 0) {
      res.push(i - 5);
    }
    if (i - D >= 0) {
      res.push(i - D);
    }
    if (i - 3 >= 0 && i % D !== 3) {
      res.push(i - 3);
    }
  }

  //below
  if (i <= 15) {
    if (i + 5 <= T && i % D !== 3) {
      res.push(i + 5);
    }
    if (i + D <= T) {
      res.push(i + D);
    }
    if (i + 3 <= T && i % D !== 0) {
      res.push(i + 3);
    }
  }

  return res;
};
