import {Field} from "./Field";
import {Player} from "./objects/Player";
import {generateMaze} from "./DickMazeGenerator";
import {DickMazeGenerator} from "./DickMazeGenerator";

export class DickGame {
  public readonly field : Field;
  public readonly player : Player;

  private readonly mazeGen : DickMazeGenerator;

  constructor(width : number, height : number) {
    this.field = generateMaze(width, height);
    this.player = new Player(0, 0);
    this.mazeGen = new DickMazeGenerator(this.field);
  }

  update() {
    this.mazeGen.nextFuckingWall();
  }
}