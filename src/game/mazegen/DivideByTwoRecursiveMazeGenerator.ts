import {Field} from "../Field";
import {Global} from "../../model/Global";
import {Stack} from "../../model/Stack";
import {randInt} from "../../model/Fn";
import {Rect} from "../../model/Rect";
import {MazeGenerator} from "./MazeGenerator";

let {NONE, WALL, EXIT} = Global.objectTypes;

const HORIZONTAL = 0;
const VERTICAL = 1;

type Side = 0 | 1;

function randHorHole(r : Rect) {
  return (r.h < 4) ? Math.random() > 0.5 ? r.y1 : r.y2
                   : randInt(r.y1, r.y2);
}

function randVerHole(r : Rect) {
  return (r.w < 4) ? Math.random() > 0.5 ? r.x1 : r.x2
                   : randInt(r.x1, r.x2);
}

export class DivideByTwoRecursiveMazeGenerator extends MazeGenerator {

  protected firstDivision() : void {
    this.nextDivision(new Rect(1, this.field.width - 2, 1, this.field.height - 2), VERTICAL);
  }

  protected nextDivision(field : Rect, splitSide : Side) : void {
    let splitIdx : number;
    let i = 0;
    while (true) {
      if (i++ === 10) return;
      if (splitSide === VERTICAL) {
        splitIdx = randInt(field.x1 + 1, field.x2 - 1);
        let a = this.field.get(splitIdx, field.y1 - 1);
        let b = this.field.get(splitIdx, field.y2 + 1);
        if (
          (a === undefined || a === WALL) &&
          (b === undefined || b === WALL)
        ) {
          break;
        }
      } else {
        splitIdx = randInt(field.y1 + 1, field.y2 - 1);
        let a = this.field.get(field.x1 - 1, splitIdx);
        let b = this.field.get(field.x2 + 1, splitIdx);
        if (
          (a === undefined || a === WALL) &&
          (b === undefined || b === WALL)
        ) {
          break;
        }
      }
    }

    splitSide === VERTICAL ? this.fillVert(field.y1, field.y2, splitIdx)
                           : this.fillHor(field.x1, field.x2, splitIdx);

    let holeIdx = splitSide === HORIZONTAL ? randVerHole(field)
                                           : randHorHole(field);

    splitSide === VERTICAL ? this.field.set(splitIdx, holeIdx, NONE)
                           : this.field.set(holeIdx, splitIdx, NONE);

    let newFields = splitSide === VERTICAL ? field.splitVertical(splitIdx)
                                           : field.splitHorizontal(splitIdx);

    newFields.forEach(f => {
      if ((splitSide === HORIZONTAL ? f.w : f.h) > 2) {
        this.stack.put(() => this.nextDivision(f, f.w > f.h ? VERTICAL : HORIZONTAL));
      }
    });
  }

  private fillHor(x1 : number, x2 : number, y : number) : void {
    for (let x = x1; x <= x2; x++) {
      this.field.set(x, y, WALL);
    }
  }

  private fillVert(y1 : number, y2 : number, x : number) : void {
    for (let y = y1; y <= y2; y++) {
      this.field.set(x, y, WALL);
    }
  }
}