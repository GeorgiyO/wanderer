import {Field} from "../Field";
import {Stack} from "../../model/Stack";
import {Global} from "../../model/Global";
import {Point} from "../../model/Point";

const {WALL, NONE, EXIT} = Global.objectTypes;

export abstract class MazeGenerator {

  protected field : Field;
  protected stack = new Stack<() => void>();

  constructor(f : Field, a : Point, b : Point) {
    this.field = f;
    this.field.fill((x, y) =>
                      x === 0 || y === 0 ||
                      x === this.field.width - 1 ||
                      y === this.field.height - 1 ? WALL : NONE);
    this.field.set(a.x, a.y, EXIT);
    this.field.set(b.x, b.y, EXIT);
    this.stack.put(() => this.firstDivision());
  }

  nextFuckingWall() : boolean {
    let fn = this.stack.get();
    if (fn !== undefined) {
      fn();
      return true;
    }
    return false;
  }

  protected abstract firstDivision() : void;
}
