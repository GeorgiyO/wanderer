export class Stack<T> {
  private root : Node<T> = new Node<T>(null, undefined);
  private top : Node<T> = this.root;

  put(value : T) {
    this.top = new Node(this.top, value);
  }

  get() : T {
    if (this.top === this.root) {
      return undefined;
    }
    let value = this.top.value;
    this.top = this.top.prev;
    return value;
  }
}

class Node<T> {
  readonly prev : Node<T>;
  readonly value : T;

  constructor(prev : Node<T>, value : T) {
    this.prev = prev;
    this.value = value;
  }
}