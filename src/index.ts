import {DickEngine} from "./engine/DickEngine";
import {Engine} from "./engine/Engine";
import {DickController} from "./controller/DickController";
import {Controller} from "./controller/Controller";
import {DickGame} from "./game/DickGame";
import {DickDisplay} from "./display/DickDisplay";
import {Global} from "./model/Global";
import {Events} from "./model/events/Events";
import {DebugDrawEvent} from "./display/DebugDrawEvent";
import {call} from "./model/Fn";
import {Rect} from "./game/DickMazeGenerator";

let i = 0;

const width = 30;
const height = 30;

const game = new DickGame(width, height);
const display = new DickDisplay(document.getElementById("mainCanvas") as HTMLCanvasElement, width, height);
const controller : Controller = new DickController();

let debugDrawOrder : (() => void)[] = [];

Events.subscribe(DebugDrawEvent, ({x, y, width, height, color}) => {
  console.log("debug draw");
  debugDrawOrder.push(() => display.drawRect(x, y, width, height, color));
});

controller.up.bindDown(() => {
  debugDrawOrder = [];
  game.update();
});

let r = new Rect(0, 0, 3, 3, 0);
r.debugDraw("black");
let [a, b] = r.splitRandom();
[a, b].forEach(r => r.debugDraw("#f00b"));

const engine : Engine = new DickEngine(
  () => {
    i++;
    if (i % 60 === 0) {
      console.log(i / 60);
    }
    controller.handleActiveInputs();
  },
  () => {
    display.fillColor("white");
    game.field.forEach((x, y, type) => {
      if (type === Global.objectTypes.NONE) {
        return;
      }
      if (type === Global.objectTypes.WALL) {
        display.drawPoint(x, y, "black");
      }
    });
    debugDrawOrder.forEach(call());
    display.render();
  },
  1000 / 60
);

["keydown", "keyup"].forEach(
  eventName => window.addEventListener(eventName, controller.keyDownUp));

engine.start();