export type Controller = {
  keyDownUp(event : KeyboardEvent) : void
  up : ButtonInputInfo
  right : ButtonInputInfo
  down : ButtonInputInfo
  left : ButtonInputInfo
  handleActiveInputs : () => void
}

export type ButtonInputInfo = {
  bindDown(fn : () => void) : void
  bindActive(fn : () => void) : void
}
