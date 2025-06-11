// src/components/Footer.jsx

import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Untuk link ke halaman lain
import { Link as ScrollLink } from 'react-scroll';   // Untuk scroll di halaman yang sama

export default function Footer() {
  const scrollLinkProps = {
    spy: true,
    smooth: true,
    duration: 500,
    offset: -80,
    className: "hover:text-cyan-400 cursor-pointer transition-colors"
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Kolom 1: Branding */}
          <div className="space-y-4">
            <RouterLink to="/" className="flex items-center space-x-2">
              <img src="/Logo.png" alt="SadarKulit Logo" className="h-12 w-auto" />
            </RouterLink>
            <p className="text-gray-400">
              Membantu Anda mengenali kondisi kulit lebih dini menggunakan teknologi AI.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h3 className="text-lg font-semibold text-white tracking-wider uppercase">Navigasi</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <ScrollLink to="hero" {...scrollLinkProps}>Beranda</ScrollLink>
              </li>
              <li>
                <ScrollLink to="deteksi" {...scrollLinkProps}>Deteksi</ScrollLink>
              </li>
              <li>
                <ScrollLink to="riwayat" {...scrollLinkProps}>Riwayat</ScrollLink>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Legal (Contoh) */}
          <div>
            <h3 className="text-lg font-semibold text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <RouterLink to="/kebijakan-privasi" className={scrollLinkProps.className}>Kebijakan Privasi</RouterLink>
              </li>
              <li>
                <RouterLink to="/syarat-ketentuan" className={scrollLinkProps.className}>Syarat & Ketentuan</RouterLink>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Media Sosial */}
          <div>
            <h3 className="text-lg font-semibold text-white tracking-wider uppercase">Ikuti Kami</h3>
            <div className="flex mt-4 space-x-4">
              <a 
                href="https://github.com/SadarKulit-CC25-CF023" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.31.678.92.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Anda bisa menambahkan link lain di sini jika perlu */}
            </div>
          </div>
        </div>

        {/* Garis pemisah dan Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-base text-gray-400">&copy; 2025 SadarKulit. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}