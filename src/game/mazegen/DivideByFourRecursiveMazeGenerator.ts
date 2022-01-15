import {MazeGenerator} from "./MazeGenerator";
import {Global} from "../../model/Global";
import {Rect} from "../../model/Rect";
import {randInt} from "../../model/Fn";
import {allSame} from "../../model/Fn";
import {takeUntil} from "../../model/Fn";
import {isEmpty} from "../../model/Fn";
import {withArgs} from "../../model/Fn";
import {randBoolean} from "../../model/Fn";
import {takeUntilTryTimes} from "../../model/Fn";
import {Events} from "../../model/events/Events";
import {DebugDrawEvent} from "../../display/DebugDrawEvent";

const {WALL, NONE, EXIT} = Global.objectTypes;

type SIDE = 0 | 1 | 2 | 3;

const LEFT = 0, TOP = 1, RIGHT = 2, BOTTOM = 3;

function randHIdx(f : Rect) : number | undefined {
  return f.h < 3 ? undefined
                 : randInt(f.y1 + 1, f.y2);
}

function randVIdx(f : Rect) : number | undefined {
  return f.w < 3 ? undefined
                 : randInt(f.x1 + 1, f.x2);
}

export class DivideByFourRecursiveMazeGenerator extends MazeGenerator {
  protected firstDivision() : void {
    this.nextDivision(new Rect(1, this.field.width - 2, 1, this.field.height - 2));
  }

  protected nextDivision(f : Rect) : void {
    if (f.w === 2 && f.h === 2) {
      return;
    }
    let vIdx = this.takeVIdx(f);
    let hIdx = this.takeHIdx(f);
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
      r.debugDraw("#ff0");
      this.stack.put(() => this.nextDivision(r));
    });
  }

  private takeVIdx(f : Rect) : number | undefined {
    return takeUntilTryTimes(() => randVIdx(f), (idx) => {
      if (isEmpty(idx)) {
        return true;
      }
      let a = this.field.get(idx, f.y1 - 1);
      let b = this.field.get(idx, f.y2 + 1);
      return a === WALL && b === WALL;
    }, 5);
  }

  private takeHIdx(f : Rect) : number | undefined {
    return takeUntilTryTimes(() => randHIdx(f), (idx) => {
      if (idx === undefined) {
        return true;
      }
      let a = this.field.get(f.x1 - 1, idx);
      let b = this.field.get(f.x2 + 1, idx);
      return a === WALL && b === WALL;
    }, 5);
  }

  private splitV(f : Rect, idx : number) : [Rect, Rect] {
    this.fillV(f, idx);
    let hole = randInt(f.y1, f.y2 + 1);
    DebugDrawEvent(idx, hole, 1, 1, "#0ff");
    this.field.set(idx, hole, NONE);
    return f.splitVertical(idx);
  }

  private splitH(f : Rect, idx : number) : [Rect, Rect] {
    this.fillH(f, idx);
    let hole = randInt(f.x1, f.x2 + 1);
    DebugDrawEvent(hole, idx, 1, 1, "#0ff");
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
    let closeSide = randInt(0, 4) as SIDE;
    if (closeSide != LEFT) {
      let hole = randInt(left, vertMiddle);
      this.field.set(hole, horMiddle, NONE);
      DebugDrawEvent(hole, horMiddle, 1, 1, "#0ff");
    }
    if (closeSide != RIGHT) {
      let hole = randInt(vertMiddle, right) + 1;
      this.field.set(hole, horMiddle, NONE);
      DebugDrawEvent(hole, horMiddle, 1, 1, "#0ff");
    }
    if (closeSide != TOP) {
      let hole = randInt(top, horMiddle);
      this.field.set(vertMiddle, hole, NONE);
      DebugDrawEvent(vertMiddle, hole, 1, 1, "#0ff");
    }
    if (closeSide != BOTTOM) {
      let hole = randInt(horMiddle, bottom) + 1;
      this.field.set(vertMiddle, hole, NONE);
      DebugDrawEvent(vertMiddle, hole, 1, 1, "#0ff");
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
}