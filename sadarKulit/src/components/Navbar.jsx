import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true jika ada token
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Apakah Anda yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00bcd4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, keluar",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.location.reload();
        if (isMenuOpen) toggleMenu(); 
      }
    });
  };

  return (
    <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 text-white px-4 py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/Logo.png" alt="SadarKulit Logo" className="h-12 w-auto" />
        </Link>

        {/* Hamburger Icon (visible on mobile) */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Nav Links (Desktop) */}
        <ul className="hidden md:flex space-x-6 text-lg text-black font-light">
          <li>
            <Link
              to="/"
              className="hover:text-cyan-400 transition duration-300 ease-in-out"
            >
              Beranda
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/deteksi" className="hover:text-cyan-400">
                  Deteksi
                </Link>
              </li>
              <li>
                <Link to="/riwayat" className="hover:text-cyan-400">
                  Riwayat
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-inherit hover:text-red-400 cursor-pointer transition duration-300"
                >
                  Keluar
                </button>

              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-cyan-400">
                  Masuk
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-cyan-400">
                  Daftar
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu (visible when toggled) */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 text-lg text-black font-light bg-white/90 backdrop-blur-md py-4">
          <li>
            <Link
              to="/"
              className="hover:text-cyan-400 transition duration-300 ease-in-out"
              onClick={toggleMenu}
            >
              Beranda
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/deteksi" className="hover:text-cyan-400" onClick={toggleMenu}>
                  Deteksi
                </Link>
              </li>
              <li>
                <Link to="/riwayat" className="hover:text-cyan-400" onClick={toggleMenu}>
                  Riwayat
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-red-400"
                >
                  Keluar
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-cyan-400" onClick={toggleMenu}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-cyan-400" onClick={toggleMenu}></Link>
                  Daftar
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}