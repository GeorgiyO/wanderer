import {withArgs} from "../Fn";

export type Subscribtion<E> = {
  unsubscribe : () => void;
}

export type Listener<E> = (e : E) => void;

/**
 * function makeEvent() : Event {...}
 *
 * then Tag<Obj> = makeObj | Obj.prototype
 */
export type Tag<E> = (...args : any[]) => E;

const subscribers = new Map<object, Set<Listener<any>>>();

function subscribersOf<E>(tag : Tag<E>) : Set<Listener<E>> {
  let subs = subscribers.get(tag);
  if (subs === undefined) {
    subs = new Set();
    subscribers.set(tag, subs);
  }
  return subs;
}

export const Events = {
  subscribe<E extends object>(tag : Tag<E>, consumer : Listener<E>) : Subscribtion<E> {
    const subs = subscribersOf(tag);
    subs.add(consumer);
    return {unsubscribe: () => subs.delete(consumer)};
  },
  unsubscribe<E extends object>(tag : Tag<E>, consumer : Listener<E>) : void {
    subscribersOf(tag).delete(consumer);
  },
  unsubscribeAll<E extends object>(tag : Tag<E>) : void {
    subscribers.set(tag, new Set());
  },
  fire<E extends object>(tag : Tag<E>, event : E) : void {
    subscribersOf(tag).forEach(withArgs(event));
  }
};
