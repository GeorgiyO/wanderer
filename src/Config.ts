class DickConfig implements Config {
  width = 1000;
  height = 1000;
  canvas = document.getElementById("mainCanvas") as HTMLCanvasElement
  engineDebugPrint = false;
  fps = 60;
}

export const config : Config = new DickConfig();
