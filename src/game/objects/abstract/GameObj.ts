import {Global} from "../../../model/Global";


export class GameObj {
  private x : number;
  private y : number;

  constructor(x : number, y : number) {
    this.x = x;
    this.y = y;
  }

  type() : number {
    return Global.objectTypes.NONE;
  }

  getX() : number {
    return this.x;
  }

  getY() : number {
    return this.y;
  }

  setX(x : number) : void {
    this.x = x;
  }

  setY(y : number) : void {
    this.y = y;
  }

  set(x : number, y : number) : void {
    this.x = x;
    this.y = y;
  }

  move(x : number, y : number) : void {
    this.x += x;
    this.y += y;
  }
}
