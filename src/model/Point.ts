export type Point = {
  x : number
  y : number
}

export function point(x : number, y : number) {
  return {x, y};
}