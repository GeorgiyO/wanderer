type EventType<T> = (...args : any[]) => T;
type Callback<T> = (t : T) => void;

const subs = new Map<EventType<any>, Set<Callback<any>>>();

function fireEvent<T>(type : EventType<T>, data : T) : void {
  let s = subs.get(type);
  s.forEach(f => f(data));
}

/**
 * make events-providers only through Events.make function
 * name of function must starts with $
 *
 * example:
 * let str = "";
 *
 * const $stringChanged = Events.makeFn((s : string) => s);
 *
 * let changeString = (s : string) => {
 *   str = s;
 *   $stringChanged(s);
 * }
 *
 * Events.subscribe($stringChanged, (s) => console.log(s))
 */
export const Events = {
  subscribe<T>(type : EventType<T>, callback : Callback<T>) : void {
    let s = subs.get(type);
    s.add(callback);
  },
  unsubscribe<T>(type : EventType<T>, callback : Callback<T>) : void {
    let s = subs.get(type);
    s.delete(callback);
  },
  make<T extends any[], R, F extends (...args : T) => R>
  (supplier : F) : F {
    let fn = ((...args : T) => {
      let data = supplier(...args);
      fireEvent(fn, data);
      return data;
    });
    subs.set(fn, new Set());
    return fn as F;
  }
};
