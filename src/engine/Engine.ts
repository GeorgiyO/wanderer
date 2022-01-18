export type Engine = {
  start() : void
  stop() : void
}

declare global {
  interface Factory {
    engine() : Engine;
  }
}

export type Updatable = {
  update() : void
};

export type Drawable = {
  draw() : void
};
