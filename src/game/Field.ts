const notInt = (n : number) => !Number.isInteger(n);

export class Field {
  private readonly data : number[][];

  public readonly width : number;
  public readonly height : number;

  constructor(width : number, height : number) {
    if (notInt(width) || notInt(height)) {
      throw `Illegal constructor argument, width(${width}) and height(${height}) must be integer`;
    }
    this.data = new Array(width).fill(0).map(
      _ => new Array(height).fill(0)
    );
    this.width = width;
    this.height = height;
  }

  public get(x : number, y : number) : number {
    if (x < 0 || x >= this.width ||
      y < 0 || y >= this.height) return undefined;
    return this.data[x][y];
  }

  public set(x : number, y : number, val : number) {
    this.data[x][y] = val;
  }

  public forEachValue(fn : (n : number) => void) : void {
    this.data.forEach(row => row.forEach(e => fn(e)));
  }

  public forEach(fn : (x : number, y : number, n : number) => void) : void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        fn(x, y, this.get(x, y));
      }
    }
  }

  public fillAll(n : number) {
    this.data.forEach(row => row.fill(n));
  }

  public fill(fn : (x : number, y : number) => number) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.set(x, y, fn(x, y));
      }
    }
  }
}

export class Field_ {
  private readonly data : Int8Array;

  public readonly width : number;
  public readonly height : number;

  constructor(width : number, height : number) {
    if (notInt(width) || notInt(height)) {
      throw `Illegal constructor argument, width(${width}) and height(${height}) must be integer`;
    }
    this.data = new Int8Array(width * height);
    this.width = width;
    this.height = height;
  }

  public get(x : number, y : number) : number {
    return this.data[this.idxOf(x, y)];
  }

  public set(x : number, y : number, val : number) {
    this.data[this.idxOf(x, y)] = val;
  }

  public forEachValue(fn : (n : number) => void) : void {
    this.data.forEach((n) => fn(n));
  }

  public forEach(fn : (x : number, y : number, n : number) => void) : void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        fn(x, y, this.get(x, y));
      }
    }
  }

  public fillAll(n : number) {
    this.data.fill(n);
  }

  public fill(fn : (x : number, y : number) => number) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.set(x, y, fn(x, y));
      }
    }
  }

  private idxOf(x : number, y : number) : number {
    return x + y * this.width;
  }
}