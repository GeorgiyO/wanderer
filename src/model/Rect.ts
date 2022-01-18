export class Rect {
  x1 : number;
  x2 : number;
  y1 : number;
  y2 : number;

  get w() : number {
    return this.x2 - this.x1 + 1;
  }

  get h() : number {
    return this.y2 - this.y1 + 1;
  }

  constructor(x1 : number, x2 : number, y1 : number, y2 : number) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }

  splitVertical(i : number) : [Rect, Rect] {
    let {x1, x2, y1, y2} = this;

    if (i <= x1 || i >= x2) {
      throw {
        msg: "хуйня",
        i,
        this: this
      };
    }

    return [
      new Rect(x1, i - 1, y1, y2),
      new Rect(i + 1, x2, y1, y2)
    ];
  }

  splitHorizontal(i : number) : [Rect, Rect] {
    let {x1, x2, y1, y2} = this;

    if (i <= y1 || i >= y2) {
      throw {
        msg: "хуйня",
        i,
        this: this
      };
    }

    return [
      new Rect(x1, x2, y1, i - 1),
      new Rect(x1, x2, i + 1, y2)
    ];
  }
}

let r = new Rect(0, 9, 0, 9);

if (r.w != 10) throw "w " + r.w;
if (r.h != 10) throw "h " + r.h;

console.log("r", r);

for (let i = 1; i < 9; i++) {
  let _r = r.splitVertical(i);
  _r.forEach(r => {
    if (r.w < 1) throw "split.r.w " + r.w;
  });
  console.log("split.r", i, _r);
}

for (let i = 1; i < 9; i++) {
  let _r = r.splitHorizontal(i);
  _r.forEach(r => {
    if (r.w < 1) throw "split.r.w " + r.w;
  });
  console.log("split.r", i, _r);
}


