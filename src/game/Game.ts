import {Scene} from "three";
import {Updatable} from "../engine/Engine";

export type Game = Updatable & {
  readonly scene : Scene
}

declare global {
  interface Factory {
    game() : Game;
  }
}