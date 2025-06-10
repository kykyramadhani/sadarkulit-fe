import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Swal from "sweetalert2";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);

    // Fetch history dari backend
    fetch("https://sadarkulit-be.vercel.app/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errMsg = await res.json();
          throw new Error(errMsg.message || "Gagal mengambil data riwayat");
        }
        return res.json();
      })
      .then((data) => {
        setHistoryData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.image.files[0];
    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "Pilih Gambar",
        text: "Silakan pilih gambar untuk diunggah!",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    Swal.fire({
      title: "Mengunggah...",
      text: "Harap tunggu saat kami memproses gambar Anda",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("https://sadarkulit-be.vercel.app/detect", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mendeteksi penyakit kulit");
      }

      Swal.fire({
        icon: "success",
        title: "Deteksi Berhasil",
        text: `Hasil deteksi: ${data.detectedDisease || "Tidak diketahui"}`,
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Deteksi Gagal",
        text: error.message || "Terjadi kesalahan saat deteksi",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div
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
          <button className="px-6 py-2 sm:px-8 sm:py-3 border border-cyan-500 bg-transparent rounded-3xl hover:bg-cyan-500 hover:text-white transition duration-300">
            <p className="text-cyan-500 hover:text-white">Deteksi Sekarang</p>
          </button>
        </div>
      </div>

      {/* Upload Section */}
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
              accept="image/*"
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

      {/* Riwayat Section */}
      <div className="relative mt-8 sm:mt-12 md:mt-16 flex flex-col md:flex-row justify-center px-4 sm:px-6">
        {/* <img
          src="/rectangle1.png"
          alt="SadarKulit Logo"
          className="mt-"
        /> */}
        <div className="flex w-full flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-black mb-6 md:mb-10">
            Riwayat Kulit Kamu
          </h1>

          {loading && <p>Loading riwayat...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {!loading && !isLoggedIn && (
            <div className="text-center">
              <p className="text-gray-600 text-base sm:text-lg mb-4">
                Oops, kamu belum login 😅
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
            <p className="text-gray-700 text-base sm:text-lg">
              Belum ada riwayat deteksi kulit.
            </p>
          )}

          {!loading && isLoggedIn && historyData.length > 0 && (
            <div className="flex flex-col items-center space-y-4">
              {historyData.map((item, idx) => (
                <div key={item._id || idx} className="flex items-center space-x-3">
                  <span className="text-gray-700 text-sm sm:text-base">
                    {new Date(item.dateChecked).toLocaleDateString()}
                  </span>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 text-sm sm:text-base">
                    {item.detectedDisease || "Tidak diketahui"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <img
          src="/pemanis2.png"
          alt="SadarKulit Logo"
          className="w-auto object-contain mt-6 md:mt-0 md:ml-8"
        />
      </div>
    </div>
  );
}