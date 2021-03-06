import {MazeGenerator} from "./MazeGenerator";
import {Global} from "../../model/Global";
import {Rect} from "../../model/Rect";
import {randInt} from "../../model/Fn";
import {isNone} from "../../model/Fn";
import {takeUntilTryTimes} from "../../model/Fn";
import {rotateRight} from "../../model/Fn";
import {sortRandom} from "../../model/Fn";

const {WALL, NONE, EXIT} = Global.objectTypes;

type Side = 0 | 1 | 2 | 3;
const LEFT = 0, TOP = 1, RIGHT = 2, BOTTOM = 3;

export class DivideByFourRecursiveMazeGenerator extends MazeGenerator {
  protected firstDivision() : void {
    this.nextDivision(new Rect(1, this.field.width - 2, 1, this.field.height - 2));
  }

  protected nextDivision(f : Rect) : void {
    if (f.w === 2 && f.h === 2) {
      this.fill2x2(f.x1, f.y1);
    }
    if (f.w < 4 && f.h < 4) {
      this.drawOnly(f);
      return;
    }
    let vIdx = this.takeVSplitIdx(f);
    let hIdx = this.takeHSplitIdx(f);
    let split : Rect[] = [];
    if (vIdx === undefined && hIdx === undefined) {
      this.nextFuckingWall();
      return;
    } else if (hIdx === undefined) {
      split = this.splitV(f, vIdx);
    } else if (vIdx === undefined) {
      split = this.splitH(f, hIdx);
    } else {
      split = this.splitBoth(f, vIdx, hIdx);
    }
    split.forEach(r => {
      this.stack.put(() => this.nextDivision(r));
    });
  }

  private takeVSplitIdx(f : Rect) : number | undefined {
    return takeUntilTryTimes(() => this.randVIdx(f), (idx) => {
      return isNone(idx) || (
        !this.isNonWallNeighbour(idx, f.y1, TOP) &&
        !this.isNonWallNeighbour(idx, f.y2, BOTTOM)
      );
    }, 5);
  }

  private randVIdx(f : Rect) : number | undefined {
    return f.w < 3 ? undefined
                   : randInt(f.x1 + 1, f.x2);
  }

  private takeHSplitIdx(f : Rect) : number | undefined {
    return takeUntilTryTimes(() => this.randHIdx(f), (idx) => {
      return isNone(idx) || (
        !this.isNonWallNeighbour(f.x1, idx, LEFT) &&
        !this.isNonWallNeighbour(f.x2, idx, RIGHT)
      );
    }, 5);
  }

  private randHIdx(f : Rect) : number | undefined {
    return f.h < 3 ? undefined
                   : randInt(f.y1 + 1, f.y2);
  }

  private splitV(f : Rect, idx : number) : [Rect, Rect] {
    this.fillV(f, idx);
    let hole = randInt(f.y1, f.y2 + 1);
    this.field.set(idx, hole, NONE);
    return f.splitVertical(idx);
  }

  private splitH(f : Rect, idx : number) : [Rect, Rect] {
    this.fillH(f, idx);
    let hole = randInt(f.x1, f.x2 + 1);
    this.field.set(hole, idx, NONE);
    return f.splitHorizontal(idx);
  }

  private splitBoth(f : Rect, vertMiddle : number, horMiddle : number) : [Rect, Rect, Rect, Rect] {
    let left = f.x1;
    let right = f.x2;
    let top = f.y1;
    let bottom = f.y2;
    this.fillV(f, vertMiddle);
    this.fillH(f, horMiddle);
    let closeSide = randInt(0, 4) as Side;
    if (closeSide != LEFT) {
      let hole = randInt(left, vertMiddle);
      this.field.set(hole, horMiddle, NONE);
    }
    if (closeSide != RIGHT) {
      let hole = randInt(vertMiddle, right) + 1;
      this.field.set(hole, horMiddle, NONE);
    }
    if (closeSide != TOP) {
      let hole = randInt(top, horMiddle);
      this.field.set(vertMiddle, hole, NONE);
    }
    if (closeSide != BOTTOM) {
      let hole = randInt(horMiddle, bottom) + 1;
      this.field.set(vertMiddle, hole, NONE);
    }
    return f.splitHorizontal(horMiddle)
            .flatMap(f => f.splitVertical(vertMiddle)) as [Rect, Rect, Rect, Rect];
  }

  private fillV(f : Rect, idx : number) : void {
    for (let y = f.y1; y <= f.y2; y++) {
      this.field.set(idx, y, WALL);
    }
  }

  private fillH(f : Rect, idx : number) : void {
    for (let x = f.x1; x <= f.x2; x++) {
      this.field.set(x, idx, WALL);
    }
  }

  private _drawOnly(f : Rect) {
    if (f.w === 2 && f.h === 2) {
      this.fill2x2(f.x1, f.y1);
    } else if (f.w < 2 && f.h < 2) {
      return;
    }
  }

  private drawOnly(f : Rect) : boolean {
    if (f.w < 2 || f.h < 2) {
      return;
    }
    this.fill2x2(f.x1, f.y1);
    if (f.w === 3) {
      this.fill2x2(f.x1 + 1, f.y1);
    }
    if (f.h === 3) {
      this.fill2x2(f.x1, f.y1 + 1);
    }
    if (f.w === 3 && f.h === 3) {
      this.fill2x2(f.x1 + 1, f.y1 + 1);
    }
  }

  private fill2x2(x : number, y : number) : void {
    for (let templatesPack of templates2x2) {
      for (let template of sortRandom(templatesPack)) {
        if (this.isGoodTemplate(x, y, template)) {
          this.drawTemplate(x, y, template);
          return;
        }
      }
    }
  }

  private isGoodTemplate(x : number, y : number, template : number[][]) : boolean {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        let e = template[i][j];
        if (e === WALL && this.hasAnyNonWallNeighbour(x + i, y + j, templates2x2CheckSides[i][j])) {
          return false;
        }
      }
    }
    return true;
  }

  private drawTemplate(x : number, y : number, template : number[][]) : void {
    for (let i = 0; i < template.length; i++) {
      for (let j = 0; j < template[i].length; j++) {
        this.field.set(x + i, j + y, template[i][j]);
      }
    }
  }

  private hasAnyNonWallNeighbour(x : number, y : number, sides : Side[]) : boolean {
    for (let s of sides) {
      if (this.isNonWallNeighbour(x, y, s)) {
        return true;
      }
    }
    return false;
  }

  private isNonWallNeighbour(x : number, y : number, side : Side) : boolean {
    if (side === TOP) {
      y--;
    } else if (side === BOTTOM) {
      y++;
    } else if (side === LEFT) {
      x--;
    } else if (side === RIGHT) {
      x++;
    }
    return this.field.get(x, y) !== WALL;
  }
}

let templates2x2CheckSides = [
  [ // x1
    [LEFT, TOP],    // y1
    [LEFT, BOTTOM]    // y2
  ],
  [ // x2
    [TOP, RIGHT], // y1
    [BOTTOM, RIGHT] // y2
  ]
] as Side[][][];

let templates2x2 = [
  [
    [WALL, WALL],
    [NONE, WALL]
  ],
  [
    [WALL, WALL],
    [NONE, NONE]
  ],
  [
    [WALL, NONE],
    [NONE, NONE]
  ]
].map(arr => {
  let _1 = arr;
  let _2 = rotateRight(_1);
  let _3 = rotateRight(_2);
  let _4 = rotateRight(_3);
  return [_1, _2, _3, _4];
});
