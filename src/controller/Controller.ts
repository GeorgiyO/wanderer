export type Controller = {
  keyDownUp(event : KeyboardEvent) : void
  up : ButtonInputInfo
  right : ButtonInputInfo
  down : ButtonInputInfo
  left : ButtonInputInfo
  handleActiveInputs : () => void
}

export type ButtonInputInfo = {
  bindActive(fn : () => void) : void
  bindDown(fn : () => void) : void
}
