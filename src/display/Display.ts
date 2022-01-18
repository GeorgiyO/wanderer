import {Scene} from "three";
import {Object3D} from "three";
import {Drawable} from "../engine/Engine";

export type Display = Drawable & {
  addScene(scene : Scene) : void
  removeScene(scene : Scene) : void
}

declare global {
  interface Factory {
    display() : Display;
  }
}

type GameScene = {
  add(mesh : Object3D) : void
  remove(mesh : Object3D) : void
}
