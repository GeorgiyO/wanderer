const {ceil, floor, random} = Math;

export const withArgs = <T extends any[], R>
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
    console.log(times);
    times--;
    return predicate(v) || times < 0;
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

export function randBoolean() : boolean {
  return Math.random() > 0.5;
}