export type Engine = {
  start() : void
  stop() : void
}

export type UpdateFn = () => void;

export type RenderFn = () => void;
