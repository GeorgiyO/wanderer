import {Field} from "./Field";
import {Player} from "./objects/Player";
import {MazeGenerator} from "./mazegen/MazeGenerator";
import {DivideByFourRecursiveMazeGenerator} from "./mazegen/DivideByFourRecursiveMazeGenerator";
import {Point} from "../model/Point";

export class DickGame {
  public readonly field : Field;
  public readonly player : Player;

  private mazeGen : MazeGenerator;

  constructor(width : number, height : number, private a : Point, private b : Point) {
    this.field = new Field(width, height);
  }

  nextLevel() {
    this.mazeGen = new DivideByFourRecursiveMazeGenerator(this.field, this.a, this.b);
    while (this.mazeGen.nextFuckingWall()) {
    }
  }

  update() {
  }
}