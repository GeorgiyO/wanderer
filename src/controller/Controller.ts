export type Controller = {
  keyDownUp(event : KeyboardEvent) : void
  up : ButtonInputInfo
  right : ButtonInputInfo
  down : ButtonInputInfo
  left : ButtonInputInfo
  enter : ButtonInputInfo
  handleActiveInputs : () => void
}

declare global {
  interface Factory {
    controller() : Controller
  }
}

export type ButtonInputInfo = {
  bindActive(fn : () => void) : void
  bindOnDown(fn : () => void) : void
}
