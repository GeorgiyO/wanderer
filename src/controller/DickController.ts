import {Controller} from "./Controller";
import {ButtonInputInfo} from "./Controller";

export class DickController implements Controller {

  keyDownUp = (event : KeyboardEvent) => {
    console.log(event.type);
    let btn = this.findButton(event.key);

    if (btn === undefined) {
      return;
    }

    btn.set(event.type == "keydown");
  };

  findButton(key : string) {
    switch (key) {
      case "ArrowUp":
        return this.up;
      case "ArrowRight":
        return this.right;
      case "ArrowDown":
        return this.down;
      case "ArrowLeft":
        return this.left;
    }
  }

  handleActiveInputs() : void {
    this.all.forEach(btn => {
      if (btn.active) {
        btn.downFn();
      }
    });
  }

  up = new DickInput();
  down = new DickInput();
  left = new DickInput();
  right = new DickInput();

  all = [this.up, this.down, this.left, this.right];
}

class DickInput implements ButtonInputInfo {

  downFn = () => {};
  activeFn = () => {};
  active = false;

  set(active : boolean) {
    if (active) {
      this.activeFn();
    }
    this.active = active;
  }

  bindDown(fn : () => void) : void {
    this.downFn = fn;
  }

  bindActive(fn : () => void) : void {
    this.activeFn = fn;
  }
}