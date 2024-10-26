let currentStep = 0;
const steps = ["stepNama", "stepTanggal", "stepBulan", "stepTahun"];
const bulanIndonesia = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const hariIndonesia = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

document.getElementById("mulaiBtn").addEventListener("click", function () {
  const usiaModal = new bootstrap.Modal(document.getElementById("usiaModal"));
  usiaModal.show();
  showStep(0);
});

document.getElementById("nextBtn").addEventListener("click", function () {
  if (validateStep()) {
    currentStep++;
    if (currentStep < steps.length) {
      showStep(currentStep);
    } else {
      hitungUsia();
    }
  }
});

function showStep(step) {
  steps.forEach((id, index) => {
    document.getElementById(id).style.display =
      index === step ? "block" : "none";
  });
}

function validateStep() {
  const stepElement = document.getElementById(steps[currentStep]);
  const input = stepElement.querySelector("input, select");
  if (input && input.value.trim() === "") {
    alert("diisi dulu lah yaa");
    return false;
  }
  return true;
}

function hitungUsia() {
  const nama = document.getElementById("nama").value;
  const tanggal = parseInt(document.getElementById("tanggal").value);
  const bulan = parseInt(document.getElementById("bulan").value);
  const tahun = parseInt(document.getElementById("tahun").value);

  const tanggalLahir = new Date(tahun, bulan, tanggal);
  const hariIni = new Date();
  const lamaHidupMs = hariIni - tanggalLahir;
  const lamaHidupHari = Math.floor(lamaHidupMs / (1000 * 60 * 60 * 24));
  const usiaTahun = hariIni.getFullYear() - tanggalLahir.getFullYear();
  const usiaBulan = Math.floor((lamaHidupHari % 365) / 30);

  const tanggalLahirString = `${
    hariIndonesia[tanggalLahir.getDay()]
  }, ${tanggal} ${bulanIndonesia[bulan]} ${tahun}`;
  const hasil = `
    <p>Halo <strong>${nama}</strong>!</p>
    <p>Anda lahir pada: <strong>${tanggalLahirString}</strong></p>
    <p>Anda telah hidup selama: <strong>${lamaHidupHari} hari (${usiaBulan} bulan)</strong></p>
    <p>Usia Anda: <strong>${usiaTahun} tahun</strong></p>
    <p>Semoga hari-harimu menyenangkan, semangat menjalani hidup, hehe</p>
  `;

  document
    .getElementById("usiaModal")
    .querySelector(
      ".modal-body"
    ).innerHTML = `<div class="alert alert-success">${hasil}</div>`;
  document.getElementById("nextBtn").style.display = "none";
}
