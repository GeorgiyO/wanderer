export type CanvasColor = string | CanvasGradient | CanvasPattern;

export class DickDisplay {

  private buffer = document.createElement("canvas").getContext("2d");
  private context : CanvasRenderingContext2D;

  constructor(canvas : HTMLCanvasElement, width : number, height : number) {
    this.context = canvas.getContext("2d");
    this.buffer.canvas.width = width;
    this.buffer.canvas.height = height;
    this.buffer.imageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;
  }

  fillColor(color : CanvasColor) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
  }

  drawRect(x : number, y : number, width : number, height : number, color : CanvasColor) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(x, y, width, height);
  }

  drawPoint(x : number, y : number, color : CanvasColor) {
    this.drawRect(x, y, 1, 1, color);
  }

  render() {
    this.context.drawImage(
      this.buffer.canvas,
      0, 0, this.buffer.canvas.width, this.buffer.canvas.height,
      0, 0, this.context.canvas.width, this.context.canvas.height
    );
  }

  resize(width : number, height : number, aspectRatio : number) {
    if (width / height > aspectRatio) {
      this.context.canvas.width = height * aspectRatio;
      this.context.canvas.height = height;
    } else {
      this.context.canvas.width = width;
      this.context.canvas.height = width / aspectRatio;
    }
    this.context.imageSmoothingEnabled = false;
  }
}