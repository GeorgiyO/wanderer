import {WebShitGlDisplay} from "./display/WebShitGlDisplay";
import {config} from "./Config";
import {ShitGame} from "./game/ShitGame";
import {memoize} from "./model/Fn";
import {DickEngine} from "./engine/DickEngine";
import {DickController} from "./controller/DickController";

declare global {
  interface Config {
    width : number
    height : number
    canvas : HTMLCanvasElement
    fps : number
    engineDebugPrint : boolean
  }
}

class DickFactory implements Factory {
  display = memoize(
    () => new WebShitGlDisplay(config.canvas, config.width, config.height)
  );

  controller = () => {
    let controller = new DickController();
    window.onkeydown = controller.keyDownUp.bind(controller);
    window.onkeyup = controller.keyDownUp.bind(controller);
    return controller;
  }

  game = memoize(
    () => {
      let game = new ShitGame(config.width, config.height, this.controller());
      this.display().addScene(game.scene);
      return game;
    }
  );

  engine = memoize(
    () => new DickEngine(this.game(), this.display(), 1, config.engineDebugPrint)
  );
}

export const factory : Factory = new DickFactory();