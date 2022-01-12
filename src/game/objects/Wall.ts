import {GameObj} from "./abstract/GameObj";
import {Global} from "../../model/Global";

export class Wall extends GameObj {
  constructor(x : number, y : number) {
    super(x, y);
  }

  type() : number {
    return Global.objectTypes.WALL;
  }
}