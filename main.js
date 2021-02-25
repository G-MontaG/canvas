document.addEventListener("DOMContentLoaded", () => {
  const canvasElement = document.getElementById("canvas");
  const ctx = canvasElement.getContext("2d");

  ctx.fillStyle = "#2ec4b6";
  ctx.fillRect(10, 10, 150, 100);
});
