// Select the canvas and its context
const canvas = document.getElementById("circlePuzzle") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

/**
 * Generate the circle puzzle based on the input string.
 */
function generatePuzzle(): void {
  const inputElement = document.getElementById("textInput") as HTMLInputElement;
  const input = inputElement.value.toUpperCase().replace(/[^A-Z]/g, ""); // Clean input
  const numCircles = input.length; // Number of concentric circles
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const outerRadius = 200;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw concentric circles dynamically based on input length
  for (let i = 1; i <= numCircles; i++) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, (outerRadius / numCircles) * i, 0, 2 * Math.PI);
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw the bold outer circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw dividing lines
  const angleStep = (2 * Math.PI) / 26;
  for (let i = 0; i < 26; i++) {
    const angle = i * angleStep;
    const xEnd = centerX + outerRadius * Math.cos(angle);
    const yEnd = centerY + outerRadius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(xEnd, yEnd);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw markers for input string
  input.split("").forEach((char, index) => {
    const charIndex = char.charCodeAt(0) - 65;
    if (charIndex >= 0 && charIndex < 26) {
      const angle = charIndex * angleStep;
      const radius = (outerRadius / numCircles) * (index + 1);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Draw circle marker
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();
    }
  });

  // Add a small triangle at the "A" position (90 degrees)
  const triangleAngle = 0; // Position for "A"
  const triangleRadius = outerRadius + 20; // Slightly outside the outer circle
  const triangleX = centerX + triangleRadius * Math.cos(triangleAngle);
  const triangleY = centerY - triangleRadius * Math.sin(triangleAngle);

  ctx.beginPath();
  ctx.moveTo(triangleX, triangleY);
  ctx.lineTo(triangleX + 10, triangleY - 10);
  ctx.lineTo(triangleX - 10, triangleY - 10);
  ctx.closePath();
  ctx.fillStyle = "black";
  ctx.fill();
}

/**
 * Save the current canvas as an image with a white background.
 */
function saveCanvas(): void {
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d") as CanvasRenderingContext2D;

  // Set up the temporary canvas
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  // Fill the temporary canvas with a white background
  tempCtx.fillStyle = "white";
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  // Draw the original canvas content on top
  tempCtx.drawImage(canvas, 0, 0);

  // Convert the temporary canvas to an image and trigger download
  const link = document.createElement("a");
  link.download = "circle_puzzle.jpg"; // Filename
  link.href = tempCanvas.toDataURL("image/jpeg"); // Convert to JPEG
  link.click(); // Trigger download
}
