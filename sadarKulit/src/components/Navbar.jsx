import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import Swal from "sweetalert2";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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

  const handleScrollToElement = (elementId) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        scroller.scrollTo(elementId, {
          smooth: true,
          duration: 500,
          offset: -80,
        });
      }, 100);
    } else {
      scroller.scrollTo(elementId, {
        smooth: true,
        duration: 500,
        offset: -80,
      });
    }
    if (isMenuOpen) toggleMenu();
  };

  const navLinkProps = {
    spy: true,
    smooth: true,
    duration: 500,
    offset: -80,
    className: "hover:text-cyan-400 cursor-pointer transition duration-300",
    activeClass: "text-cyan-500 font-semibold"
  };

  return (
    <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 text-white px-4 py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <RouterLink to="/" className="flex items-center space-x-2">
          <img src="/Logo.png" alt="SadarKulit Logo" className="h-12 w-auto" />
        </RouterLink>

        <button className="md:hidden text-black focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>

        {/* Nav Links (Desktop) */}
        <ul className="hidden md:flex space-x-6 text-lg text-black font-light">
          {isLoggedIn ? (
            <>
              <li><a onClick={() => handleScrollToElement('hero')} {...navLinkProps}>Beranda</a></li>
              <li><a onClick={() => handleScrollToElement('deteksi')} {...navLinkProps}>Deteksi</a></li>
              <li><a onClick={() => handleScrollToElement('riwayat')} {...navLinkProps}>Riwayat</a></li>
              <li><RouterLink to="/about" className={navLinkProps.className}>Tentang Kami</RouterLink></li>
              <li><button onClick={handleLogout} className="text-inherit hover:text-red-400 cursor-pointer transition duration-300">Keluar</button></li>
            </>
          ) : (
            <>
              {/* Tambahkan link "Tentang Kami" untuk Desktop saat belum login */}
              <li><RouterLink to="/" className={navLinkProps.className}>Beranda</RouterLink></li>
              <li><RouterLink to="/about" className={navLinkProps.className}>Tentang Kami</RouterLink></li> {/* <--- Perubahan di sini */}
              <li><RouterLink to="/login" className={navLinkProps.className}>Masuk</RouterLink></li>
              <li><RouterLink to="/register" className={navLinkProps.className}>Daftar</RouterLink></li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 text-lg text-black font-light bg-white/90 backdrop-blur-md py-4">
          {isLoggedIn ? (
            <>
              <li><a onClick={() => handleScrollToElement('hero')} {...navLinkProps}>Beranda</a></li>
              <li><a onClick={() => handleScrollToElement('deteksi')} {...navLinkProps}>Deteksi</a></li>
              <li><a onClick={() => handleScrollToElement('riwayat')} {...navLinkProps}>Riwayat</a></li>
              <li><RouterLink to="/about" onClick={toggleMenu} className={navLinkProps.className}>Tentang Kami</RouterLink></li>
              <li><button onClick={handleLogout} className="hover:text-red-400">Keluar</button></li>
            </>
          ) : (
            <>
              {/* Tambahkan link "Tentang Kami" untuk Mobile saat belum login */}
              <li><RouterLink to="/" onClick={toggleMenu} className={navLinkProps.className}>Beranda</RouterLink></li>
              <li><RouterLink to="/about" onClick={toggleMenu} className={navLinkProps.className}>Tentang Kami</RouterLink></li> {/* <--- Perubahan di sini */}
              <li><RouterLink to="/login" onClick={toggleMenu} className={navLinkProps.className}>Masuk</RouterLink></li>
              <li><RouterLink to="/register" onClick={toggleMenu} className={navLinkProps.className}>Daftar</RouterLink></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}