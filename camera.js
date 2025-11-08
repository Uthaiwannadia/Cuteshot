// ส่วนกล้อง
const video = document.getElementById('camera');
const canvas = document.getElementById('photo');
const ctx = canvas.getContext('2d');
const captureBtn = document.getElementById('capture');

// เปิดกล้องทันทีเมื่อหน้าโหลด
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert('เปิดกล้องไม่ได้! โปรดอนุญาตให้ใช้กล้อง');
    console.error(err);
  }
}
startCamera();

// ถ่ายภาพเมื่อกดปุ่ม
captureBtn.addEventListener('click', () => {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
});
