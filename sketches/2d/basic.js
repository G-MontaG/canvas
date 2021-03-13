const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: "A4",
  orientation: "portrait",
  units: "px",
  pixelsPerInch: 300,
};

const sketch = () => {
  return ({ context, width, height }) => {
    // background
    context.fillStyle = "#2ec4b6";
    context.fillRect(0, 0, width, height);

    // circle
    context.beginPath();
    context.arc(width / 2, height / 2, width * 0.3, 0, Math.PI * 2, false);
    context.fillStyle = "tomato";
    context.fill();
    context.lineWidth = width * 0.025;
    context.strokeStyle = "blue";
    context.stroke();
  };
};

canvasSketch(sketch, settings);
