// test.js — Hanya dijalankan setelah fullscreen aktif

var constraints = { video: { facingMode: "user" }, audio: false };
let track = null;

const cameraView    = document.querySelector("#camera--view");
const cameraOutput  = document.querySelector("#camera--output");
const cameraSensor  = document.querySelector("#camera--sensor");
const cameraTrigger = document.querySelector("#camera--trigger");

// Fungsi mulai kamera
function cameraStart() {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Gagal akses kamera:", error);
            alert("Kamera tidak bisa diakses. Pastikan kamu izinkan akses kamera.");
        });
}

// Tombol ambil foto → dengan delay 2 detik setelah kamera nyala
cameraTrigger.onclick = function() {
    // Pastikan kamera sudah hidup dulu
    if (!cameraView.srcObject) {
        cameraStart();
    }

    // Delay 2 detik baru ambil foto
    setTimeout(function() {
        if (cameraView.videoWidth === 0) {
            alert("Kamera belum siap, coba lagi dalam beberapa detik.");
            return;
        }

        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        cameraOutput.src = cameraSensor.toDataURL("image/webp");
        cameraOutput.style.display = "block"; // pastikan foto muncul
    }, 2000); // 2 detik delay
};
