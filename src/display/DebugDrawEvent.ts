import {CanvasColor} from "./DickDisplay";

export function DebugDrawEvent(x : number, y : number, width : number, height : number, color : CanvasColor) {
  return {
    x, y, width, height, color
  };
}