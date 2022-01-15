import {DickEngine} from "./engine/DickEngine";
import {Engine} from "./engine/Engine";
import {DickController} from "./controller/DickController";
import {Controller} from "./controller/Controller";
import {DickGame} from "./game/DickGame";
import {DickDisplay} from "./display/DickDisplay";
import {Global} from "./model/Global";
import {Events} from "./model/events/Events";
import {DebugDrawEvent} from "./display/DebugDrawEvent";
import {callWithArgs} from "./model/Fn";
import {point} from "./model/Point";

let i = 0;

const width = 100;
const height = 100;

const game = new DickGame(width, height, point(2, 0), point(width - 2, height - 1));
const display = new DickDisplay(document.getElementById("mainCanvas") as HTMLCanvasElement, width, height);
const controller : Controller = new DickController();

let debugDrawOrder : (() => void)[] = [];

Events.subscribe(DebugDrawEvent, ({x, y, width, height, color}) => {
  debugDrawOrder.push(() => display.drawRect(x, y, width, height, color));
});

let updates : (() => void)[] = [];

let act = () => {
  updates.push(() => {
    debugDrawOrder = [];
    game.update();
  });
};

controller.up.bindDown(act);
controller.up.bindActive(act);

const engine : Engine = new DickEngine(
  () => {
    i++;
    if (i % 60 === 0) {
      console.log(i / 60);
    }
    controller.handleActiveInputs();
    updates.forEach(callWithArgs());
    updates = [];
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
      if (type === Global.objectTypes.EXIT) {
        display.drawPoint(x, y, "red");
      }
    });
    debugDrawOrder.forEach(callWithArgs());
    display.render();
  },
  1000 / 60,
  false
);

["keydown", "keyup"].forEach(
  eventName => window.addEventListener(eventName, controller.keyDownUp));

engine.start();