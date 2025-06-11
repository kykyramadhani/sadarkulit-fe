import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom"; // Kita ganti nama Link dari router
import { Link as ScrollLink } from "react-scroll"; // Impor Link dari react-scroll
import Swal from "sweetalert2";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    // ... fungsi handleLogout Anda tidak berubah ...
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

  const navLinkProps = {
    spy: true,
    smooth: true,
    duration: 500,
    offset: -80, // Offset agar section tidak tertutup navbar
    className: "hover:text-cyan-400 cursor-pointer transition duration-300",
    activeClass: "text-cyan-500 font-semibold" // Style untuk link yang aktif
  };

  return (
    <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 text-white px-4 py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo tetap menggunakan RouterLink */}
        <RouterLink to="/" className="flex items-center space-x-2">
          <img src="/Logo.png" alt="SadarKulit Logo" className="h-12 w-auto" />
        </RouterLink>

        {/* Hamburger Icon */}
        <button className="md:hidden text-black focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
          {/* ... SVG icon tidak berubah ... */}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>

        {/* Nav Links (Desktop) */}
        <ul className="hidden md:flex space-x-6 text-lg text-black font-light">
          {isLoggedIn ? (
            <>
              <li><ScrollLink to="hero" {...navLinkProps}>Beranda</ScrollLink></li>
              <li><ScrollLink to="deteksi" {...navLinkProps}>Deteksi</ScrollLink></li>
              <li><ScrollLink to="riwayat" {...navLinkProps}>Riwayat</ScrollLink></li>
              <li><button onClick={handleLogout} className="text-inherit hover:text-red-400 cursor-pointer transition duration-300">Keluar</button></li>
            </>
          ) : (
            <>
              <li><RouterLink to="/login" className={navLinkProps.className}>Masuk</RouterLink></li>
              <li><RouterLink to="/register" className={navLinkProps.className}>Daftar</RouterLink></li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 text-lg text-black font-light bg-white/90 backdrop-blur-md py-4">
          <li><RouterLink to="/" onClick={toggleMenu} className={navLinkProps.className}>Beranda</RouterLink></li>
          {isLoggedIn ? (
            <>
              <li><ScrollLink to="deteksi" {...navLinkProps} onClick={toggleMenu}>Deteksi</ScrollLink></li>
              <li><ScrollLink to="riwayat" {...navLinkProps} onClick={toggleMenu}>Riwayat</ScrollLink></li>
              <li><button onClick={handleLogout} className="hover:text-red-400">Keluar</button></li>
            </>
          ) : (
            <>
              <li><RouterLink to="/login" onClick={toggleMenu} className={navLinkProps.className}>Login</RouterLink></li>
              <li><RouterLink to="/register" onClick={toggleMenu} className={navLinkProps.className}>Daftar</RouterLink></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}