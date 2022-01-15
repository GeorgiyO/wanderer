const {ceil, floor, random} = Math;

export const callWithArgs = <T extends any[], R>
(...args : T) =>
  (fn : (...args : T) => R) =>
    fn(...args);

export function randInt(min : number, max : number) : number {
  if (max < min) {
    throw {
      msg: "еблан",
      min,
      max
    };
  }
  min = ceil(min);
  max = floor(max);
  return floor(random() * (max - min) + min);
}

export function isPresent<T>(value : T) : boolean {
  return value !== undefined;
}

export function isEmpty<T>(value : T) : boolean {
  return value === undefined || value === null;
}

export function takeUntilTryTimes<T>(consumer : () => T, predicate : (t : T) => boolean, times : number) : T {
  return takeUntil(consumer, (v) => {
    return predicate(v) || times-- < 0;
  });
}

export function takeUntil<T>(consumer : () => T, predicate : (t : T) => boolean) : T {
  let result : T;
  do {
    result = consumer();
  } while (!predicate(result));
  return result;
}

export function noneSame(main : any, ...rest : any[]) : boolean {
  for (let r of rest) {
    if (main === r) {
      return false;
    }
  }
  return true;
}

export function allSame(main : any, ...rest : any[]) : boolean {
  for (let r of rest) {
    if (main !== r) {
      return false;
    }
  }
  return true;
}

export function anySame(main : any, ...rest : any[]) : boolean {
  for (let r of rest) {
    if (main === r) {
      return true;
    }
  }
  return false;
}

export function randBoolean() : boolean {
  return Math.random() > 0.5;
}

export function rotateRight<T>(arr : T[][]) : T[][] {
  return arr[0].map((_, colIndex) => arr
    .map(row => row[colIndex])
    .map((_, i, row) => row[row.length - 1 - i])
  );
}

export function sortRandom<T>(arr : T[]) : T[] {
  let randoms = arr.map(_ => Math.random());
  let indexes = new Map<T, number>();
  arr.forEach((e, i) => indexes.set(e, i));
  return arr.sort((a, b) => {
    let _a = randoms[indexes.get(a)];
    let _b = randoms[indexes.get(b)];
    return _a > _b ? 1
                   : _a === _b ? 0
                               : -1;
  });
}