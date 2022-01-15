import {CanvasColor} from "./DickDisplay";
import {Events} from "../model/events/Events";

export function DebugDrawEvent(x : number, y : number, width : number, height : number, color : CanvasColor) {
  let data = {
    x, y, width, height, color
  };
  Events.fire(DebugDrawEvent, data);
  return data;
}