import {Game} from "./Game";
import {Scene} from "three";
import {Mesh} from "three";
import {PlaneGeometry} from "three";
import {MeshBasicMaterial} from "three";
import {Controller} from "../controller/Controller";

export class ShitGame implements Game {
  readonly scene : Scene = new Scene();
  readonly obj : Mesh<PlaneGeometry, MeshBasicMaterial>;

  constructor(private readonly width : number,
              private readonly height : number,
              private readonly controller : Controller) {
    this.obj = new Mesh(
      new PlaneGeometry(1, 1),
      new MeshBasicMaterial({
        color: 0xff00ff
      })
    );
    this.obj.scale.set(width / 2, height / 2, 1);
    this.obj.position.set(width / 2, height / 2, 1);
    this.updateObjColor();
    this.scene.add(this.obj);
    controller.enter.bindOnDown(this.updateObjColor.bind(this));
  }

  updateObjColor() : void {
    this.obj.material.color.setRGB(
      this.randomColor(),
      this.randomColor(),
      this.randomColor()
    );
  }

  update() : void {
    this.controller.handleActiveInputs();
    this.obj.rotateZ(0.01);
  }

  private randomColor() : number {
    return Math.random();
  }
}