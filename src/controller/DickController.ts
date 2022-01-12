import {Controller} from "./Controller";
import {ButtonInputInfo} from "./Controller";

export class DickController implements Controller {

  keyDownUp = (event : KeyboardEvent) => {
    console.log(event.type);
    let btn = this.findButton(event.key);

    if (btn === undefined) {
      return;
    }

    btn.setActive(event.type == "keydown");
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
        btn.activeFn();
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

  activeFn = () => {};
  downFn = () => {};
  active = false;

  setActive(active : boolean) {
    if (active) {
      this.downFn();
    }
    this.active = active;
  }

  bindActive(fn : () => void) : void {
    this.activeFn = fn;
  }

  bindDown(fn : () => void) : void {
    this.downFn = fn;
  }
}