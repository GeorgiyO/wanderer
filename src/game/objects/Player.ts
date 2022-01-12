import {GameObj} from "./abstract/GameObj";
import {Global} from "../../model/Global";

export class Player extends GameObj {
  constructor(x : number, y : number) {
    super(x, y);
  }

  type() : number {
    return Global.objectTypes.PLAYER;
  }
}