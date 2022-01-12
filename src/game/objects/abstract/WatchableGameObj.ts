import {GameObj} from "./GameObj";
import {Events} from "../../../model/events/Events";
import {Tag} from "../../../model/events/Events";

function watchMoving<O extends GameObj>(obj : O) : O {
  const {
    setX, setY, set, move
  } = obj;
  obj.setX = (x) => {
    setX.call(obj, x);
    Events.fire(ObjectMoved, obj);
  };
  obj.setY = (y) => {
    setY.call(obj, y);
    Events.fire(ObjectMoved, obj);
  };
  obj.set = (x, y) => {
    set.call(obj, x, y);
    Events.fire(ObjectMoved, obj);
  };
  obj.move = (x, y) => {
    move.call(obj, x, y);
    Events.fire(ObjectMoved, obj);
  };
  return obj;
}

const ObjectMoved = watchMoving as Tag<GameObj>;

export {watchMoving, ObjectMoved};
