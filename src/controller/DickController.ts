import {Controller} from "./Controller";
import {ButtonInputInfo} from "./Controller";

export class DickController implements Controller {

  keyDownUp(event : KeyboardEvent) {
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
      case "Enter":
        return this.enter;
    }
  }

  handleActiveInputs() : void {
    this.all.forEach(btn => {
      if (btn.active) {
        btn.onActive();
      }
    });
  }

  up = new DickInput();
  down = new DickInput();
  left = new DickInput();
  right = new DickInput();
  enter = new DickInput();

  all = [this.up, this.down, this.left, this.right, this.enter];
}

class DickInput implements ButtonInputInfo {

  onActive = () => {};
  onDown = () => {};
  active = false;

  set(activate : boolean) {
    if (activate) {
      this.onDown();
    }
    this.active = activate;
  }

  bindActive(fn : () => void) : void {
    console.log(fn.toString());
    this.onActive = fn;
  }

  bindOnDown(fn : () => void) : void {
    this.onDown = fn;
  }
}