const [width, height] = [595, 842];
const pixelsPerInch = 300;

document.addEventListener("DOMContentLoaded", () => {
  const canvasElement = document.getElementById("canvas");

  canvasElement.width = (width / 72) * pixelsPerInch;
  canvasElement.height = (height / 72) * pixelsPerInch;

  canvasElement.style.width = `${width}px`;
  canvasElement.style.height = `${height}px`;
  const ctx = canvasElement.getContext("2d");

  // background
  ctx.fillStyle = "#2ec4b6";
  ctx.fillRect(0, 0, width, height);

  // circle
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 200, 0, Math.PI * 2, false);
  ctx.fillStyle = "tomato";
  ctx.fill();
  ctx.lineWidth = 20;
  ctx.strokeStyle = "blue";
  ctx.stroke();
});
