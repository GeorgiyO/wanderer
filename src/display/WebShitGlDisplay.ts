import {Events} from "../model/events/Events";
import {Renderer} from "three";
import {OrthographicCamera} from "three";
import {Scene} from "three";
import {$enableDebug} from "../debug/Debug";
import {$disableDebug} from "../debug/Debug";
import {WebGLRenderer} from "three";
import {Mesh} from "three";
import {BoxGeometry} from "three";
import {MeshBasicMaterial} from "three";
import {Camera} from "three";
import {Display} from "./Display";

export class WebShitGlDisplay implements Display {

  private readonly canvas : HTMLCanvasElement;
  private readonly renderer : Renderer;
  private readonly camera : Camera;

  private readonly scenes = new Set<Scene>();
  private debugElements : Mesh[] = [];

  constructor(canvas : HTMLCanvasElement, width : number, height : number) {
    this.canvas = canvas;
    canvas.height = height;
    canvas.width = width;
    this.renderer = new WebGLRenderer({canvas});
    this.camera = new OrthographicCamera(0, width, height, 0, 1, 2001);
    this.camera.scale.y = 1;
    this.camera.position.z = 2001;

    Events.subscribe($enableDebug, this.showDebugElements.bind(this));
    Events.subscribe($disableDebug, this.removeDebugElements.bind(this));

    for (let [color, x, y, z] of [
      [0xff0000, 1, 0, 0],
      [0x00ff00, 0, 1, 0],
      [0x0000ff, 0, 0, 1]
    ]) {
      let axis = new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshBasicMaterial({color})
      );

      let a = width / 3;
      let b = width / 100;
      let c = a;

      axis.scale.set(
        x ? a : b,
        y ? a : b,
        z ? a : b
      );
      axis.position.set(
        x ? c : 0,
        y ? c : 0,
        z ? c : 0
      );

      this.debugElements.push(axis);
    }
  }

  public addScene(scene : Scene) : void {
    this.scenes.add(scene);
  }

  public removeScene(scene : Scene) : void {
    this.scenes.delete(scene);
  }

  public draw() : void {
    this.scenes.forEach((scene) => {
      this.renderer.render(scene, this.camera);
    });
  }

  private showDebugElements() {
    this.scenes.forEach((scene) => {
      this.debugElements.forEach(_ => scene.add(_));
    });
  }

  private removeDebugElements() {
    this.scenes.forEach((scene) => {
      this.debugElements.forEach(_ => scene.remove(_));
    });
  }
}