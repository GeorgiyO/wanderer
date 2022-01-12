import {Field} from "./Field";
import {Global} from "../model/Global";
import {Stack} from "../model/Stack";
import {randInt} from "../model/Fn";
import {Events} from "../model/events/Events";
import {DebugDrawEvent} from "../display/DebugDrawEvent";
import {CanvasColor} from "../display/DickDisplay";

let {NONE, WALL} = Global.objectTypes;

const HORIZONTAL = 0;
const VERTICAL = 1;

type Side = 0 | 1;

export class DickMazeGenerator {
  private readonly field : Field;
  private readonly stack = new Stack<[Rect, number]>();

  constructor(field : Field) {
    this.field = field;
    this.stack.put([new Rect(0, 0, field.width, field.height, HORIZONTAL), -1]);
  }

  nextFuckingWall() {
    let [area, prevHoleIdx] = this.stack.get();
    if (area === undefined) {
      console.log("area is undefined");
      return;
    }
    // split shit
    let [a, b, lineIdx] = area.splitRandom();
    let holeIdx : number;

    // draw dick line and anal hole
    if (area.sideToBeCut === VERTICAL) {
      this.fillVert(area.y, area.height, lineIdx);
      holeIdx = area.randVerticalIdx();
      while (holeIdx === prevHoleIdx) {
        holeIdx = area.randVerticalIdx();
      }
      this.field.set(lineIdx, holeIdx, NONE);
    } else {
      this.fillHor(area.x, area.width, lineIdx);
      holeIdx = area.randHorizontalIdx();
      while (holeIdx === prevHoleIdx) {
        holeIdx = area.randHorizontalIdx();
      }
      this.field.set(holeIdx, lineIdx, NONE);
    }
    // put next areas if there are good
    [a, b].forEach((area) => {
      if (area.sideToBeCut === VERTICAL && area.width > 4) {
        this.stack.put([area, holeIdx]);
        area.debugDraw("#f004");
      } else if (area.sideToBeCut === HORIZONTAL && area.height > 4) {
        this.stack.put([area, holeIdx]);
        area.debugDraw("#f004");
      }
    });
  }

  private fillHor(x : number, width : number, y : number) : void {
    for (let i = 0; i < width; i++) {
      this.field.set(x + i, y, WALL);
    }
  }

  private fillVert(y : number, height : number, x : number) : void {
    for (let i = 0; i < height; i++) {
      this.field.set(x, y + i, WALL);
    }
  }
}

export class Rect {
  x : number;
  y : number;
  width : number;
  height : number;
  sideToBeCut : Side;

  constructor(x : number, y : number, width : number, height : number, sideToBeCut : Side) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sideToBeCut = sideToBeCut;
  }

  splitRandom() : [Rect, Rect, number] {
    let idx = this.sideToBeCut === VERTICAL ? this.randHorizontalIdx()
                                            : this.randVerticalIdx();
    let res = this.split(idx);
    // @ts-ignore
    res.push(idx);
    return res as unknown as [Rect, Rect, number];
  }

  split(idx : number) : [Rect, Rect] {
    let a : Rect;
    let b : Rect;

    let {x, y, width, height, sideToBeCut} = this;

    if (sideToBeCut === VERTICAL) {
      if (idx < y && idx > height) thr();
      a = new Rect(x, y, idx, height, HORIZONTAL);
      b = new Rect(idx + 1, y, width - idx - 1, height, HORIZONTAL);
    } else {
      if (idx < x && idx > height) thr();
      a = new Rect(x, y, width, idx, VERTICAL);
      b = new Rect(x, idx + 1, width, height - idx - 1, VERTICAL);
    }

    if ((sideToBeCut === VERTICAL ? idx < y && idx > height
                                  : idx < x && idx > width)) {
      throw `Rect.split(${idx}) Долбаеб иди нахуй ${x}, ${y}, ${width}, ${height}, ${sideToBeCut}`;
    }

    return [a, b];

    function thr() {
      throw `Rect.split(${idx}) Долбаеб иди нахуй ${x}, ${y}, ${width}, ${height}, ${sideToBeCut}`;
    }
  }

  randHorizontalIdx() : number {
    return randInt(this.x + 1, this.x + this.width - 1);
  }

  randVerticalIdx() : number {
    return randInt(this.y + 1, this.y + this.height - 1);
  }

  debugDraw(color : CanvasColor) : void {
    Events.fire(DebugDrawEvent, DebugDrawEvent(
      this.x, this.y, this.width, this.height, color
    ));
  }
}

export function generateMaze(width : number, height : number) : Field {
  let field = new Field(width, height);
  field.fillAll(NONE);
  return field;
}