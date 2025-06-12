import { useEffect, useState } from "react"; // Impor useState dan useEffect
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Logo from "/Logo.png"; // Pastikan path logo Anda benar

export default function About() {
  // Data tim Anda
  const teamMembers = [
    {
      name: "Muhammad Naufal Rahmatullah",
      role: "Machine Learning Engineer (Team Leader)",
      id: "MC253D5Y0305",
      university: "Universitas Mataram",
      image: "/naufal.jpg", // Ganti dengan path gambar Naufal
    },
    {
      name: "Putu Indah Puspita Dewi",
      role: "Machine Learning Engineer",
      id: "MC253D5X2460",
      university: "Universitas Mataram",
      image: "/indah.jpg", // Ganti dengan path gambar Indah
    },
    {
      name: "Anselma Kalika Kirana",
      role: "Machine Learning Engineer",
      id: "MC253D5X2467",
      university: "Universitas Mataram",
      image: "/anselma.jpg", // Ganti dengan path gambar Anselma
    },
    {
      name: "Muhammad Rizki Assamsuli",
      role: "Frontend & Backend Developer",
      id: "FC253D5Y1728",
      university: "Universitas Mataram",
      image: "/kisul.jpg", 
    },
    {
      name: "Rizky Insania Ramadhani",
      role: "Frontend & Backend Developer",
      id: "FC253D5X2294",
      university: "Universitas Mataram",
      image: "/kyky.jpg", 
    },
  ];

  // Data Tech Stack
  const techStack = {
    backend: [
      { name: "Node.js", logo: "/nodejs.svg" }, // Sesuaikan path logo
      { name: "Express.js", logo: "/expressjs.svg" },
      { name: "MongoDB", logo: "/mongodb.svg" },
      { name: "Mongoose", logo: "/mongoose.svg" }, // Tambahkan logo Mongoose jika ada
    ],
    frontend: [
      { name: "React.js", logo: "/react.svg" },
      { name: "Tailwind CSS", logo: "/tailwindcss.svg" },
    ],
    machineLearning: [
      { name: "TensorFlow", logo: "/Tensorflow.png" }, // Gunakan TensorFlow atau scikit-learn/PyTorch
      { name: "Python", logo: "/python.svg" }, // Jika Anda menggunakan Python untuk ML
    ],
  };

  // State untuk animasi ketikan
  const phrases = ["Machine Learning", "Website"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150); // Kecepatan ketik
  const [pauseDelay, setPauseDelay] = useState(2000); // Jeda sebelum hapus/ketik ulang

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const fullText = phrases[currentPhraseIndex];
      setCurrentText(
        isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1)
      );

      setTypingSpeed(isDeleting ? 70 : 150); // Kecepatan hapus lebih cepat

      if (!isDeleting && currentText === fullText) {
        // Jika selesai mengetik, jeda lalu mulai hapus
        setTypingSpeed(pauseDelay);
        setIsDeleting(true);
      } else if (isDeleting && currentText === '') {
        // Jika selesai menghapus, pindah ke frasa berikutnya
        setIsDeleting(false);
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setTypingSpeed(150); // Reset kecepatan ketik
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, typingSpeed, pauseDelay, phrases]);


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6">
        <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-8 sm:p-10 md:p-12">
          {/* Logo aplikasi di tengah */}
          <div className="flex justify-center mb-8">
            <img src={Logo} alt="Logo SadarKulit" className="h-16 w-auto" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Tentang SadarKulit</h1>
          {/* Animasi Ketikan */}
          <p className="text-xl sm:text-2xl text-cyan-600 font-semibold mb-6 sm:mb-8 text-center min-h-[1.5em]"> {/* min-h untuk mencegah lompatan layout */}
            Pendeteksi Penyakit Kulit berbasis <span className="font-mono">{currentText}</span><span className="animate-blink">|</span> {/* Animasi kursor */}
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            SadarKulit adalah aplikasi yang dirancang untuk membantu Anda mengenali dan memahami berbagai penyakit kulit. Dengan teknologi deteksi canggih, SadarKulit memberikan informasi yang mudah dipahami tentang kondisi kulit Anda.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Aplikasi ini menggunakan model machine learning yang telah dilatih dengan ribuan gambar penyakit kulit untuk memberikan diagnosis awal yang cepat dan efisien. Kami percaya bahwa pengetahuan adalah kunci untuk perawatan kesehatan yang lebih baik, dan SadarKulit bertujuan untuk memberdayakan pengguna dengan informasi yang mereka butuhkan.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Dengan antarmuka yang ramah pengguna, SadarKulit memungkinkan Anda untuk mengunggah foto kulit Anda, mendapatkan analisis awal, dan menerima rekomendasi langkah-langkah perawatan yang sesuai. Kami juga menyediakan informasi tentang faktor penyebab dan langkah penanganan awal untuk berbagai kondisi kulit.
          </p>

          {/* Section Tech Stack */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-8 mb-6 text-center">Teknologi yang Kami Gunakan</h2>
          <div className="space-y-8">
            {/* Backend Tech Stack */}
            <div>
              <h3 className="text-xl sm:text-2xl font-medium text-gray-700 mb-4">Backend</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {techStack.backend.map((tech, idx) => (
                  <div key={idx} className="flex flex-col items-center p-3 border border-gray-200 rounded-lg shadow-sm bg-white">
                    <img src={tech.logo} alt={tech.name} className="h-12 w-auto object-contain mb-2" />
                    <span className="text-sm text-gray-700 font-medium text-center">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frontend Tech Stack */}
            <div>
              <h3 className="text-xl sm:text-2xl font-medium text-gray-700 mb-4">Frontend</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {techStack.frontend.map((tech, idx) => (
                  <div key={idx} className="flex flex-col items-center p-3 border border-gray-200 rounded-lg shadow-sm bg-white">
                    <img src={tech.logo} alt={tech.name} className="h-12 w-auto object-contain mb-2" />
                    <span className="text-sm text-gray-700 font-medium text-center">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Machine Learning Tech Stack */}
            <div>
              <h3 className="text-xl sm:text-2xl font-medium text-gray-700 mb-4">Machine Learning</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {techStack.machineLearning.map((tech, idx) => (
                  <div key={idx} className="flex flex-col items-center p-3 border border-gray-200 rounded-lg shadow-sm bg-white">
                    {/* Beberapa item ML mungkin tidak punya logo spesifik, jadi kita bisa pakai placeholder atau conditional render */}
                    {tech.logo && <img src={tech.logo} alt={tech.name} className="h-12 w-auto object-contain mb-2" />}
                    <span className="text-sm text-gray-700 font-medium text-center">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* ANGGOTA TIM */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-12 mb-6 text-center">Tim CC25-CF023</h2> {/* Nama tim di sini */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover mb-4 rounded-2xl"
                />
                <div className="p-4 w-full">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-cyan-600 text-sm font-medium mb-1">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.university}</p>
                  <p className="text-gray-500 text-xs mt-1">ID: {member.id}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} SadarKulit. All rights reserved.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}