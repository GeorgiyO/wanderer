import {Field} from "./Field";
import {Player} from "./objects/Player";
import {MazeGenerator} from "./mazegen/MazeGenerator";
import {DivideByFourRecursiveMazeGenerator} from "./mazegen/DivideByFourRecursiveMazeGenerator";
import {Point} from "../model/Point";

export class DickGame {
  public readonly field : Field;
  public readonly player : Player;

  private readonly mazeGen : MazeGenerator;

  constructor(width : number, height : number, a : Point, b : Point) {
    this.field = new Field(width, height);
    this.player = new Player(0, 0);
    this.mazeGen = new DivideByFourRecursiveMazeGenerator(this.field, a, b);
  }

  update() {
    // for (let i = 0; i < 10; i++) {
      this.mazeGen.nextFuckingWall();
    // }
  }
}