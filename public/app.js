const video = document.getElementById("camera");
const canvas = document.getElementById("captureCanvas");
const captureButton = document.getElementById("captureButton");
const paletteGrid = document.getElementById("paletteGrid");
const flash = document.getElementById("flash");
const cameraStatus = document.getElementById("cameraStatus");
const cameraPlaceholder = document.getElementById("cameraPlaceholder");
const formatButtons = Array.from(document.querySelectorAll(".format-button"));

let currentFormat = "hex";
let currentPalette = [];

async function startCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    cameraStatus.textContent = "Camera access is not supported in this browser.";
    cameraPlaceholder.textContent = "Your browser does not support webcam access.";
    captureButton.disabled = true;
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    });

    video.srcObject = stream;
    await video.play();

    cameraStatus.textContent = "Camera ready";
    cameraPlaceholder.classList.add("is-hidden");
    captureButton.disabled = false;
  } catch (error) {
    console.error("Camera error:", error);
    cameraStatus.textContent = "Camera blocked";
    cameraPlaceholder.textContent =
      "Allow camera access and load this page from localhost or HTTPS.";
    captureButton.disabled = true;
  }
}

function flashScreen() {
  flash.classList.add("is-visible");
  window.setTimeout(() => {
    flash.classList.remove("is-visible");
  }, 120);
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function getTextColor(r, g, b) {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#10291f" : "#ffffff";
}

function formatColor(color) {
  const [r, g, b] = color;
  return currentFormat === "hex"
    ? rgbToHex(r, g, b)
    : `rgb(${r}, ${g}, ${b})`;
}

function quantizeColor(r, g, b) {
  const step = 32;
  return [
    Math.min(255, Math.round(r / step) * step),
    Math.min(255, Math.round(g / step) * step),
    Math.min(255, Math.round(b / step) * step),
  ];
}

function colorDistance(a, b) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
}

function extractDominantColors(imageData, maxColors = 6) {
  const counts = new Map();
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 16) {
    const alpha = data[i + 3];
    if (alpha < 125) {
      continue;
    }

    const quantized = quantizeColor(data[i], data[i + 1], data[i + 2]);
    const key = quantized.join(",");
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  const sorted = Array.from(counts.entries())
    .map(([key, count]) => ({
      color: key.split(",").map(Number),
      count,
    }))
    .sort((a, b) => b.count - a.count);

  const palette = [];

  for (const entry of sorted) {
    const isTooClose = palette.some((existing) => {
      return colorDistance(existing, entry.color) < 42;
    });

    if (!isTooClose) {
      palette.push(entry.color);
    }

    if (palette.length === maxColors) {
      break;
    }
  }

  return palette;
}

function renderPalette(palette) {
  if (!palette.length) {
    paletteGrid.innerHTML = `
      <article class="empty-state">
        <h3>No palette yet</h3>
        <p>Capture a frame to generate six dominant colors from the camera image.</p>
      </article>
    `;
    return;
  }

  paletteGrid.innerHTML = "";

  palette.forEach((color, index) => {
    const [r, g, b] = color;
    const value = formatColor(color);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "swatch";
    button.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    button.style.color = getTextColor(r, g, b);
    button.setAttribute("aria-label", `Copy color ${value}`);
    button.innerHTML = `
      <span class="swatch-content">
        <span class="swatch-label">Color ${index + 1}</span>
        <span class="swatch-value">${value}</span>
      </span>
    `;

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(value);
        cameraStatus.textContent = `Copied ${value}`;
      } catch (error) {
        console.error("Clipboard error:", error);
        cameraStatus.textContent = "Copy failed";
      }
    });

    paletteGrid.appendChild(button);
  });
}

function captureFrame() {
  if (!video.videoWidth || !video.videoHeight) {
    cameraStatus.textContent = "Camera is not ready yet.";
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  currentPalette = extractDominantColors(imageData, 6);

  renderPalette(currentPalette);
  flashScreen();
  cameraStatus.textContent = "Palette updated";
}

formatButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFormat = button.dataset.format;

    formatButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    renderPalette(currentPalette);
  });
});

captureButton.addEventListener("click", captureFrame);
captureButton.disabled = true;
renderPalette([]);
startCamera();
