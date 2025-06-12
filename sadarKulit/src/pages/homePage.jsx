import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import { classLabels } from "../data/classLabels";

// --- PRASYARAT 1: Impor data dan komponen yang dibutuhkan ---
import { firstAidData } from "../data/firstAidData"; // Pastikan path ini benar
import DetectionResult from "../components/DetectionResult"; // Pastikan komponen ini ada dan path-nya benar
import Footer from "../components/Footer";
// ---------------------------------------------------------

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // --- PERUBAHAN 1: Tambahkan state baru untuk menyimpan hasil deteksi ---
  const [detectionResult, setDetectionResult] = useState(null);
  // ----------------------------------------------------------------------

  const fetchHistory = async (token) => {
    // ... (fungsi fetchHistory Anda tidak perlu diubah, sudah bagus)
    try {
      const response = await fetch("https://sadarkulit-be.vercel.app/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errMsg = await response.json();
        throw new Error(errMsg.message || "Gagal mengambil data riwayat");
      }
      const data = await response.json();
      setHistoryData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ... (fungsi useEffect Anda tidak perlu diubah, sudah bagus)
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }
    setIsLoggedIn(true);
    fetchHistory(token);
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.image.files[0];
    
    // Reset tampilan hasil sebelumnya setiap kali upload baru
    setDetectionResult(null);

    // ... (Validasi file Anda tidak perlu diubah, sudah bagus)
    if (!file) {
      Swal.fire({ icon: "warning", title: "Pilih Gambar", text: "Silakan pilih gambar untuk diunggah!", confirmButtonColor: "#3085d6" });
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      Swal.fire({ icon: "warning", title: "Format Tidak Didukung", text: "Hanya file JPEG, PNG, atau WEBP yang diizinkan!", confirmButtonColor: "#3085d6" });
      return;
    }

    Swal.fire({
      title: "Menganalisis...",
      text: "Harap tunggu saat kami memproses gambar Anda",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Anda harus login untuk melakukan deteksi");

      const response = await fetch("https://sadarkulit-be.vercel.app/predict", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mendeteksi penyakit kulit");
      }

      Swal.close();

      // Cari ID berdasarkan nama penyakit ramah dari backend
      const diseaseName = data.predicted_disease;
      const extractedId = Object.keys(classLabels).find(
        key => classLabels[key] === diseaseName
      );

      console.log(`Disease Name: "${diseaseName}", Extracted ID: "${extractedId}"`);

      if (extractedId) {
        const matchedData = firstAidData.find(item => item.id === extractedId);
        if (matchedData) {
          const finalResult = { ...matchedData, confidence: data.confidence };
          setDetectionResult(finalResult);
          setTimeout(() => {
            document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          throw new Error(`Informasi detail untuk "${diseaseName}" tidak ditemukan di firstAidData.`);
        }
      } else {
        throw new Error(`ID untuk "${diseaseName}" tidak ditemukan di classLabels.`);
      }

      await fetchHistory(token);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Deteksi Gagal",
        text: error.message || "Terjadi kesalahan saat deteksi",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleHistoryClick = (historyItem) => {
    const diseaseString = historyItem.detectedDisease;
    if (!diseaseString) return;

    const extractedId = Object.keys(classLabels).find(
      key => classLabels[key] === diseaseString
    );

    console.log(`Penyakit: "${diseaseString}", ID yang ditemukan: "${extractedId}"`);

    if (extractedId) {
      const matchedData = firstAidData.find(item => item.id === extractedId);
      if (matchedData) {
        const resultToShow = { ...matchedData };
        setDetectionResult(resultToShow);
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        Swal.fire('Info', `Informasi detail untuk "${diseaseString}" tidak lengkap.`, 'info');
      }
    } else {
      Swal.fire('Info', `Tidak dapat menemukan ID untuk "${diseaseString}".`, 'info');
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
        {/* Hero Section */}
      <div
        id="hero"
        className="relative py-12 px-4 sm:py-16 sm:px-6 md:py-24 md:px-10 bg-cover bg-center text-white"
        style={{ backgroundImage: 'url("/bg.png")' }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none"></div>
        <div className="relative lg:ml-20 w-auto mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-black mb-4 sm:mb-6 leading-tight">
            Selamat <br /> Datang di <br /> SadarKulit
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-black mb-6 sm:mb-8 leading-relaxed">
            Website Pendeteksi Penyakit Kulit
          </p>
          <button
            onClick={() => document.querySelector('input[name="image"]').click()}
            className="px-6 py-2 sm:px-8 sm:py-3 border border-cyan-500 bg-transparent rounded-3xl hover:bg-cyan-500 hover:text-white transition duration-300"
          >
            <p className="text-cyan-500 hover:text-white">Deteksi Sekarang</p>
          </button>
        </div>
      </div>

      <div id="deteksi">
        
        {/* 2. Ini adalah Upload Section Anda (id="deteksi" sudah dihapus dari sini) */}
        <div className="mt-8 sm:mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6">
          <img
            src="/pemanis1.png"
            alt="SadarKulit Logo"
            className="w-full sm:max-w-sm md:max-w-md object-contain mb-6 md:mb-0 md:mr-8"
          />
          <div className="flex w-full flex-col items-center text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-cyan-500 mb-6 md:mb-10">
              Deteksi Penyakit Kulit Kamu!
            </h1>
            <form onSubmit={handleUpload} className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="file"
                name="image"
                accept="image/jpeg,image/png,image/webp"
                className="border border-gray-300 rounded-3xl p-2 w-full sm:w-auto"
              />
              <button
                type="submit"
                className="px-4 py-2 text-cyan-500 border border-cyan-500 bg-transparent rounded-3xl hover:bg-cyan-500 hover:text-white transition duration-300"
              >
                Upload
              </button>
            </form>
          </div>
        </div>

        {/* 3. Ini adalah Result Section Anda (tetap dengan id="result-section") */}
        {/* Section ini akan muncul atau hilang di dalam wrapper 'deteksi' */}
        {detectionResult && (
          <div id="result-section" className="w-full max-w-4xl mx-auto my-12 sm:my-16 px-4 sm:px-6">
            <DetectionResult diseaseInfo={detectionResult} />
          </div>
        )}
      </div>
      
      {/* --- BAGIAN RIWAYAT (VERSI BARU DENGAN GAMBAR) --- */}
      <div id="riwayat" className="w-full bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Judul Section (tetap di tengah) */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Riwayat Deteksi Anda
            </h1>
            <p className="text-gray-500 mt-2">Lihat kembali hasil deteksi yang pernah Anda lakukan.</p>
          </div>

          {/* Kontainer utama dengan layout 2 kolom di layar medium (md) ke atas */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">

            {/* --- KOLOM KIRI: DAFTAR RIWAYAT --- */}
            <div className="w-full md:w-3/5 lg:w-1/2">
              <div className="status-container">
                
                {/* Kondisi Loading, Error, Belum Login, atau Riwayat Kosong */}
                {loading && <p className="text-center text-gray-600">Loading riwayat...</p>}
                {error && <p className="text-center text-red-600">Error: {error}</p>}

                {!loading && !isLoggedIn && (
                  <div className="text-center bg-white p-8 rounded-lg shadow-sm">
                    <p className="text-gray-600 text-lg mb-4">
                      Oops, kamu belum masuk untuk melihat riwayat 😅
                    </p>
                    <button
                      onClick={() => navigate("/login")}
                      className="px-6 py-2 text-cyan-500 border border-cyan-500 rounded-full hover:bg-cyan-500 hover:text-white transition"
                    >
                      Login Sekarang
                    </button>
                  </div>
                )}

                {!loading && isLoggedIn && historyData.length === 0 && (
                  <p className="text-center text-gray-700 text-lg">
                    Belum ada riwayat deteksi kulit yang tersimpan.
                  </p>
                )}

                {/* Tampilan utama untuk daftar riwayat jika ada data */}
                {!loading && isLoggedIn && historyData.length > 0 && (
                  <div className="space-y-4">
                    {historyData.map((item, idx) => (
                      <div 
                        key={item._id || idx} 
                        className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md border-l-4 border-cyan-500 hover:shadow-lg transition-shadow duration-300"
                      >
                        <span className="font-mono text-sm sm:text-base text-gray-500">
                          {new Date(item.dateChecked).toLocaleDateString('id-ID', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </span>

                        {/* --- TAMBAHKAN onClick DI SINI --- */}
                        <button 
                          onClick={() => handleHistoryClick(item)} 
                          className="px-5 py-2 bg-cyan-500 text-white rounded-full text-sm sm:text-base font-semibold hover:bg-cyan-600 transition-colors duration-300"
                        >
                          {item.detectedDisease || "Tidak diketahui"}
                        </button>
                        {/* ------------------------------- */}
                        
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* --- KOLOM KANAN: GAMBAR PEMANIS --- */}
            {/* Gambar ini disembunyikan di layar kecil (mobile) dan muncul di layar medium ke atas */}
            <div className="hidden md:block md:w-2/5 lg:w-1/2 p-4">
              <img
                src="/pemanis2.png"
                alt="Ilustrasi Perawatan Kulit"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}