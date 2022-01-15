import {Engine} from "./Engine";
import {UpdateFn} from "./Engine";
import {RenderFn} from "./Engine";

const now = () => window.performance.now();

export class DickEngine implements Engine {

  private readonly update : UpdateFn = undefined;
  private readonly render : RenderFn = undefined;
  private readonly timeStep : number = undefined;

  constructor(update : UpdateFn, render : RenderFn, timeStep : number, withLogging : boolean) {
    if (withLogging) {
      this.update = () => {
        let updateTime = now();
        update();
        updateTime = now() - updateTime;
        console.log(`update time: ${updateTime / timeStep}`)
      }
      this.render = () => {
        let renderTime = now();
        render();
        renderTime = now() - renderTime;
        console.log(`render time: ${renderTime / timeStep}`)
      }
    } else {
      this.update = update;
      this.render = render;
    }
    this.timeStep = timeStep;
  }

  public time = 0;

  private accumulatedTime = 0;
  private updated = false;
  private running = false;

  private tick = 1;

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

    if (this.tick % 60 === 0) {
      this.tick = 1;
    }
    this.tick++;
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