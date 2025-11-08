const video = document.getElementById("liveVideo");
const canvas = document.getElementById("finalCanvas");
const ctx = canvas.getContext("2d");
const statusText = document.getElementById("status");

let shotCount = 0; // เก็บจำนวนรูปที่ถ่ายแล้ว

async function openCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: 720, height: 960 },
      audio: false
    });
    video.srcObject = stream;
    statusText.textContent = "Camera opened! Ready to capture.";
  } catch (err) {
    alert("ไม่สามารถเปิดกล้องได้: " + err.message);
  }
}

function capturePhoto() {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (vw === 0 || vh === 0) {
    alert("กล้องยังไม่พร้อม!");
    return;
  }

  // แต่ละรูปมีตำแหน่ง (2x2)
  const gridCols = 2;
  const gridRows = 2;
  const imgW = canvas.width / gridCols;
  const imgH = canvas.height / gridRows;

  // คำนวณตำแหน่งของรูปต่อไป
  const col = shotCount % gridCols;
  const row = Math.floor(shotCount / gridCols);

  // วาดรูปในช่องที่กำหนด
  ctx.save();
  ctx.translate(canvas.width, 0); // mirror
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, vw, vh,
                col * imgW, row * imgH, imgW, imgH);
  ctx.restore();

  shotCount++;
  statusText.textContent = `Captured ${shotCount}/4`;

  if (shotCount >= 4) {
    statusText.textContent = "Completed 4 photos!";
  }
}

function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shotCount = 0;
  statusText.textContent = "Reset complete. Ready to capture again.";
}

document.getElementById("openCam").addEventListener("click", openCamera);
document.getElementById("capture").addEventListener("click", capturePhoto);
document.getElementById("reset").addEventListener("click", resetCanvas);


