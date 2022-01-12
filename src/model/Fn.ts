const {ceil, floor, random} = Math;

export const call =
  <T extends any[], R>
  (...args : T) =>
    (fn : (...args : T) => R) => fn(...args);

export function randInt(min : number, max : number) : number {
  console.log("randInt", min, max);
  min = ceil(min);
  max = floor(max);
  return floor(random() * (max - min) + min);
}