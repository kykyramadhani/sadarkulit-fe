import React from 'react';

// Komponen sekarang menerima satu prop: `diseaseInfo`
// yang berisi objek lengkap dari `firstAidData` ditambah `confidence`
export default function DetectionResult({ diseaseInfo }) {

  // Pengecekan untuk keamanan, jika karena suatu hal data tidak ada
  if (!diseaseInfo) {
    return null; // Tidak menampilkan apa-apa jika tidak ada data
  }

  return (
    // Kontainer utama dengan latar belakang putih, sudut membulat, dan bayangan
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
      
      {/* --- BAGIAN HEADER: JUDUL DAN TINGKAT KEYAKINAN --- */}
      <div className="text-center border-b pb-4 mb-6">
        <h2 className="text-xl text-gray-600">Hasil Deteksi Penyakit Kulit</h2>
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-600 mt-2">
          {diseaseInfo.diseaseName}
        </h1>
        {diseaseInfo.confidence && (
          <p className="mt-3 text-lg text-gray-800">
            Tingkat Keyakinan: 
            <span className="font-semibold text-cyan-500"> {(diseaseInfo.confidence * 100).toFixed(2)}%</span>
          </p>
        )}
      </div>

      {/* --- LAYOUT UTAMA: Menggunakan Grid untuk 2 kolom --- */}
      {/* Di layar kecil akan menumpuk, di layar medium ke atas akan menjadi 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* --- KOLOM KIRI: PENYEBAB PENYAKIT (CAUSES) --- */}
        <div className="causes-section">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-cyan-500 pl-3">
            Faktor Penyebab
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {/* Gunakan .map() untuk menampilkan setiap item dari array 'causes' */}
            {diseaseInfo.causes.map((cause, index) => (
              <li key={index}>{cause}</li>
            ))}
          </ul>
        </div>

        {/* --- KOLOM KANAN: LANGKAH PENANGANAN (FIRST AID) --- */}
        <div className="first-aid-section">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-cyan-500 pl-3">
            Langkah Penanganan Awal
          </h3>
          <div className="space-y-4">
            {/* Gunakan .map() untuk menampilkan setiap objek dari array 'firstAidSteps' */}
            {diseaseInfo.firstAidSteps.map((step, index) => (
              <div key={index}>
                <h4 className="font-bold text-gray-900">{step.title}</h4>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- DISCLAIMER MEDIS (SANGAT PENTING) --- */}
      <div className="mt-8 pt-4 border-t text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg">
        <strong>Penting:</strong> Informasi ini adalah referensi umum dan tidak dapat menggantikan diagnosis, saran, atau resep dari profesional medis. Segera konsultasikan dengan dokter untuk penanganan yang tepat.
      </div>

    </div>
  );
}