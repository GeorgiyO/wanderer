import {Engine} from "./Engine";
import {UpdateFn} from "./Engine";
import {RenderFn} from "./Engine";

export class DickEngine implements Engine {

  private readonly update : UpdateFn = undefined;
  private readonly render : RenderFn = undefined;
  private readonly timeStep : number = undefined;

  constructor(update : UpdateFn, render : RenderFn, timeStep : number) {
    this.update = update;
    this.render = render;
    this.timeStep = timeStep;
  }

  public time = 0;

  private accumulatedTime = 0;
  private updated = false;
  private running = false;

  private run(timeStamp : number) : void {
    this.accumulatedTime += timeStamp - this.time;
    this.time = timeStamp;

    if (this.accumulatedTime >= this.timeStep * 3) {
      this.accumulatedTime = this.timeStep;
    }

    while (this.accumulatedTime >= this.timeStep) {
      this.accumulatedTime -= this.timeStep;
      this.update();
      this.updated = true;
    }

    if (this.updated) {
      this.updated = false;
      this.render();
    }

    if (this.running) {
      this.startLoop();
    }
  }

  private runFn : (ts : number) => void = this.run.bind(this);

  private startLoop() {
    window.requestAnimationFrame(this.runFn);
  }

  start() : void {
    this.accumulatedTime = this.timeStep;
    this.time = window.performance.now();
    this.running = true;
    this.startLoop();
  }

  stop() : void {
    this.running = false;
  }
}